import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = 5050;
const app = express();

// Mongoose connection established
const collection = "sample_training";
await mongoose.connect(process.env.ATLAS_URI + collection);

import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);
app.use("/grades", grades_agg);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
