const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },

    recommendations: {
        type: [String],
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema
);