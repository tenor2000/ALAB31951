import mongoose from "mongoose";

const learnerSchema = new mongoose.Schema(
  {
    scores: [
      {
        type: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
    class_id: {
      type: Number,
      required: true,
    },
    learner_id: {
      type: Number,
      required: true,
    },
  },
  { collection: "grades" } // IMPORTANT to point to correct collections when its named different from model
);

export default mongoose.model("Learner", learnerSchema);
