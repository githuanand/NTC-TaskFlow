const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Todo = require("./models/Todo");

const resetDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Todo.deleteMany({});
    await User.deleteMany({});

    console.log("=================================");
    console.log("DATABASE RESET SUCCESSFUL");
    console.log("All users deleted");
    console.log("All tasks deleted");
    console.log("=================================");
  } catch (error) {
    console.error("Database reset error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

resetDatabase();