const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  research_Field: {
    type: String,
    required: true,
  },
  research_Topic: {
    name: { type: String, required: true },
    status: { type: String, default: false },
  },
  research_Topic_doc: {
    type: String,
    default: "",
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    default: null,
  },
  coSupervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    default: null,
  },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  requested: {
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    coSupervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
  },
  pannel: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = mongoose.model("Groups", GroupSchema);
