// ============================================================
// FILE: backend/routes/todoRoutes.js
// PURPOSE: Protected CRUD API routes for user-specific tasks
// ============================================================

const express = require("express");
const Todo = require("../models/Todo");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// GET USER'S TASKS
// GET /api/tasks
// ============================================================

router.get("/", protect, async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(todos);
  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// ============================================================
// CREATE TASK
// POST /api/tasks
// ============================================================

router.post("/", protect, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      user: req.user.userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// ============================================================
// TOGGLE TASK
// PUT /api/tasks/:id
// ============================================================

router.put("/:id", protect, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// ============================================================
// DELETE TASK
// DELETE /api/tasks/:id
// ============================================================

router.delete("/:id", protect, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

// ============================================================
// EXPORT ROUTER
// ============================================================

module.exports = router;