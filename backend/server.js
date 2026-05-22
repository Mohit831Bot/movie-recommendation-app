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
mongoose.connect("mongodb://127.0.0.1:27017/Movie")
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