// ============================================================
// FILE: backend/server.js
// PURPOSE: Express server and MongoDB connection
// ============================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());
app.use(express.json());

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "TaskManager backend is running",
  });
});

// ============================================================
// TASK ROUTES
// ============================================================

app.use("/api/tasks", todoRoutes);

// ============================================================
// MONGODB CONNECTION
// ============================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });