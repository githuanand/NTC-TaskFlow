// ============================================================
// FILE: frontend/src/components/TaskForm.jsx
// PURPOSE: Form for creating a new task
// ============================================================

import { useState } from "react";

// ============================================================
// TASK FORM COMPONENT
// ============================================================

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd(title);

    setTitle("");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;