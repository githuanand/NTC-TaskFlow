// ============================================================
// FILE: backend/models/Todo.js
// PURPOSE: MongoDB schema for NTC admin-created tasks
// ============================================================

const mongoose = require("mongoose");

// ============================================================
// TODO SCHEMA
// ============================================================

const todoSchema = new mongoose.Schema(
  {
    // --------------------------------------------------------
    // TASK INFORMATION
    // --------------------------------------------------------

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    // --------------------------------------------------------
    // ADMIN WHO CREATED THE TASK
    // --------------------------------------------------------

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // --------------------------------------------------------
    // USERS ASSIGNED TO THIS TASK
    // EACH USER HAS INDIVIDUAL PROGRESS
    // --------------------------------------------------------

    assignments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        completed: {
          type: Boolean,
          default: false,
        },

        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ============================================================
// EXPORT TODO MODEL
// ============================================================

module.exports = mongoose.model("Todo", todoSchema);