const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  document: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  marking_scheme: {
    type: String,
    required: true,
  },
  due_date: {
    type: String,
    required: true,
  },
  due_time: {
    type: String,
    required: true,
  },
  max_size: {
    type: Number,
    default: 10,
  },
  visibility: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Submissions", submissionSchema);
