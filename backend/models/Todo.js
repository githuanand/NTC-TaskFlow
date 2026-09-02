// ============================================================
// FILE: backend/models/Todo.js
// PURPOSE: MongoDB schema for TaskManager tasks
// ============================================================

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);