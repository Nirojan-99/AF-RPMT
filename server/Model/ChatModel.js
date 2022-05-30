const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Groups",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chats", chatSchema);
