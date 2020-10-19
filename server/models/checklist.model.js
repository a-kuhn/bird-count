const mongoose = require("mongoose");

const CheckListSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    title: {
        type: String,
    },
    notes: {
      type: String,
    },
    birds: {
      type: Array,
      minlength: [1, "Checklist must contain at least 1 bird."],
    },
  },
  { timestamps: true },
);

const Checklist = mongoose.model("Checklist", ChecklistSchema);

module.exports = Checklist;