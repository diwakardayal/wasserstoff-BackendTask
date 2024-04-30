/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const imageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  annotations: [
    {
      label: {
        type: String,
        required: true,
      },
      confidence: {
        type: Number,
      },
      boundingBox: {
        type: Object,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model("image", imageSchema);
