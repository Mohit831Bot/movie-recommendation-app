require("dotenv").config();
const recommendationRoutes = require("./routes/recommendationRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use("/api/recommendations", recommendationRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});