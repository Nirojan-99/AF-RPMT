const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    mobile_number: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    NIC: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
    dp: {
      type: String,
      default: "",
    },
    DOB: {
      type: String,
      default: "",
    },
    OTP: {
      type: Number,
    },
    requests: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" },
        role: { type: String },
      },
    ],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Groups" }],
    pannel: [{ type: mongoose.Schema.Types.ObjectId, ref: "Groups" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
