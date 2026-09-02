// ============================================================
// FILE: frontend/src/components/TaskList.jsx
// PURPOSE: Displays tasks and task actions
// ============================================================

function TaskList({ tasks, onToggle, onDelete }) {
  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  if (!tasks.length) {
    return <p>No tasks yet!</p>;
  }

  // ==========================================================
  // TASK LIST
  // ==========================================================

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={task.completed ? "done" : ""}
        >
          <span
            onClick={() => onToggle(task._id)}
            style={{
              cursor: "pointer",
              textDecoration: task.completed
                ? "line-through"
                : "none",
            }}
          >
            {task.title}
          </span>

          <button
            type="button"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;