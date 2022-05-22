const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    submitted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    submmited_date: {
      type: String,
      required: true,
    },
    submission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submissions",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Docs", docSchema);
