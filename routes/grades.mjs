import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

import Learner from "../models/learner.mjs";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  // let collection = await db.collection("grades");
  // let newDocument = req.body;

  let newDocument = new Learner(req.body);

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  // let result = await collection.insertOne(newDocument);

  await newDocument.save();

  res.send(newDocument).status(201);
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { _id: ObjectId(req.params.id) };
  // let result = await collection.findOne(query);

  let result = await Learner.findById(req.params.id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  // let collection = await db.collection("grades");
  let query = { _id: req.params.id };

  // let result = await collection.updateOne(query, {
  //   $push: { scores: req.body },
  // });

  let result = await Learner.updateOne(query, { $push: { scores: req.body } });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  // let collection = await db.collection("grades");
  let query = { _id: req.params.id };

  // let result = await collection.updateOne(query, {
  //   $pull: { scores: req.body },
  // });

  let result = await Learner.updateOne(query, { $pull: { scores: req.body } });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { _id: ObjectId(req.params.id) };
  // let result = await collection.deleteOne(query);

  let result = await Learner.deleteOne({ _id: req.params.id });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  console.log("Redirecting...");
  res.redirect(`/grades/learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  // // mongodb way
  // let collection = await db.collection("grades");
  let query = { learner_id: Number(req.params.id) };

  // // Check for class_id parameter
  if (req.query.class) query.class_id = Number(req.query.class);

  // let result = await collection.find(query).toArray();

  let result = await Learner.find(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { learner_id: Number(req.params.id) };

  // let result = await collection.deleteOne(query);

  let result = await Learner.deleteOne({ learner_id: req.params.id });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  // Check for learner_id parameter
  if (req.query.learner) query.learner_id = Number(req.query.learner);

  // let result = await collection.find(query).toArray();

  let result = await Learner.find(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  // let result = await collection.updateMany(query, {
  //   $set: { class_id: req.body.class_id },
  // });

  let result = await Learner.updateMany(query, {
    $set: { class_id: req.body.class_id },
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { class_id: Number(req.params.id) };

  // let result = await collection.deleteMany(query);

  let result = await Learner.deleteMany({ class_id: req.params.id });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
