// ============================================================
// FILE: frontend/src/App.jsx
// PURPOSE: Main TaskManager application component
// ============================================================

import { useEffect, useState } from "react";
import axios from "axios";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

// ============================================================
// API CONFIGURATION
// ============================================================

const API_URL = "http://localhost:5000/api/tasks";

// ============================================================
// APP COMPONENT
// ============================================================

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // FETCH TASKS
  // ==========================================================

  const fetchTasks = async () => {
    try {
      setError("");

      const response = await axios.get(API_URL);

      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);

      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchTasks();
  }, []);

  // ==========================================================
  // ADD TASK
  // ==========================================================

  const addTask = async (title) => {
    if (!title.trim()) {
      return;
    }

    try {
      setError("");

      await axios.post(API_URL, {
        title: title.trim(),
      });

      await fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);

      setError("Unable to add task.");
    }
  };

  // ==========================================================
  // TOGGLE TASK
  // ==========================================================

  const toggleTask = async (id) => {
    try {
      setError("");

      await axios.put(`${API_URL}/${id}`);

      await fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);

      setError("Unable to update task.");
    }
  };

  // ==========================================================
  // DELETE TASK
  // ==========================================================

  const deleteTask = async (id) => {
    try {
      setError("");

      await axios.delete(`${API_URL}/${id}`);

      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);

      setError("Unable to delete task.");
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="app">
      <h1>TaskManager</h1>

      <p>Manage your tasks efficiently.</p>

      <TaskForm onAdd={addTask} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}

export default App;