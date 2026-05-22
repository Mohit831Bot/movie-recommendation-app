const express = require("express");
const router = express.Router();

const Recommendation = require("../models/Recommendation");

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});


// GET Route
router.get("/", async (req, res) => {

    try {

        const data = await Recommendation.find();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// POST Route
router.post("/", async (req, res) => {

    try {

        const { prompt } = req.body;

        const completion =
            await openai.chat.completions.create({

                model: "meta-llama/llama-3-8b-instruct",

                messages: [
                    {
                        role: "user",
                        content:
                            `Suggest 5 movies for this preference: ${prompt}.
                             Return only movie names line by line.`
                    }
                ]
            });

        const response =
            completion.choices[0].message.content;

        const recommendations = response
            .split("\n")
            .map(movie =>
                movie.replace(/^\d+\.\s*/, "").trim()
            )
            .filter(movie => movie);

        const newRecommendation =
            new Recommendation({
                prompt,
                recommendations
            });

        await newRecommendation.save();

        res.status(201).json({
            prompt,
            recommendations
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;