const mongoose = require("mongoose");

const ChecklistSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "[No Title]",
    },
    notes: {
      type: String,
    },
    birds: {
      type: Array,
      minlength: [1, "Checklist must contain at least 1 bird."],
    },
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
  },
  { timestamps: true },
);

const Checklist = mongoose.model("Checklist", ChecklistSchema);

module.exports = Checklist;