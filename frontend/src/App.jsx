// ============================================================
// FILE: frontend/src/App.jsx
// PURPOSE: NTC Portal Selection + Authentication + Task Dashboard
// ============================================================

import { useEffect, useState } from "react";
import axios from "axios";

import PortalSelection from "./pages/PortalSelection";

// ============================================================
// API CONFIGURATION
// ============================================================

const AUTH_API = "https://ntc-task-manager-backend.onrender.com/api/auth";
const TASK_API = "https://ntc-task-manager-backend.onrender.com/api/tasks";


// ============================================================
// MAIN APP
// ============================================================

function App() {
  // ==========================================================
  // HASH ROUTING STATE
  // ==========================================================

  const getCurrentRoute = () => {
    const hash = window.location.hash.toLowerCase();

    if (hash === "#ntcportal") {
      return "ntcportal";
    }

    return "main";
  };

  const [route, setRoute] = useState(getCurrentRoute);

  // ==========================================================
  // LISTEN FOR HASH CHANGES
  // ==========================================================

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  // ==========================================================
  // NTC PORTAL / TASK MANAGER
  //
  // ONLY:
  // https://your-domain.vercel.app/#ntcportal
  // ==========================================================

  if (route === "ntcportal") {
    return <TaskManagerApp />;
  }

  // ==========================================================
  // MAIN PORTAL
  //
  // https://your-domain.vercel.app/
  // ==========================================================

  return <PortalSelection />;
}

// ============================================================
// TASK MANAGER APP
// ============================================================

function TaskManagerApp() {
  // ==========================================================
  // AUTH STATE
  // ==========================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskmanager_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("taskmanager_token") || ""
  );

  const [authMode, setAuthMode] = useState("login");

  // ==========================================================
  // AUTH FORM STATE
  // ==========================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ==========================================================
  // TASK STATE
  // ==========================================================

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================================
  // SAVE AUTHENTICATION DATA
  // ==========================================================

  const saveAuth = (authToken, authUser) => {
    localStorage.setItem(
      "taskmanager_token",
      authToken
    );

    localStorage.setItem(
      "taskmanager_user",
      JSON.stringify(authUser)
    );

    setToken(authToken);
    setUser(authUser);
  };

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {
    localStorage.removeItem("taskmanager_token");
    localStorage.removeItem("taskmanager_user");

    setToken("");
    setUser(null);
    setTasks([]);

    setName("");
    setEmail("");
    setPassword("");
    setTaskTitle("");

    setError("");
    setSuccess("");

    // Stay inside TaskManager login after logout
    window.location.hash = "ntcportal";
  };

  // ==========================================================
  // BACK TO PORTAL SELECTION
  // ==========================================================

  const backToPortals = () => {
    localStorage.removeItem("taskmanager_token");
    localStorage.removeItem("taskmanager_user");

    setToken("");
    setUser(null);
    setTasks([]);

    setError("");
    setSuccess("");

    // Return to MAIN PORTAL
    window.location.hash = "";
  };

  // ==========================================================
  // AUTHENTICATION
  // ==========================================================

  const handleAuth = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let response;

      // ------------------------------------------------------
      // REGISTER
      // ------------------------------------------------------

      if (authMode === "register") {
        response = await axios.post(
          `${AUTH_API}/register`,
          {
            name: name.trim(),
            email: email.trim(),
            password,
          }
        );
      }

      // ------------------------------------------------------
      // LOGIN
      // ------------------------------------------------------

      else {
        response = await axios.post(
          `${AUTH_API}/login`,
          {
            email: email.trim(),
            password,
          }
        );
      }

      // ------------------------------------------------------
      // SAVE AUTH DATA
      // ------------------------------------------------------

      saveAuth(
        response.data.token,
        response.data.user
      );

      // ------------------------------------------------------
      // CLEAR FORM
      // ------------------------------------------------------

      setName("");
      setEmail("");
      setPassword("");

      // ------------------------------------------------------
      // SUCCESS MESSAGE
      // ------------------------------------------------------

      setSuccess(
        authMode === "register"
          ? "Account created successfully."
          : "Login successful."
      );
    } catch (err) {
      console.error(
        "Authentication error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to complete authentication."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // FETCH TASKS
  // ==========================================================

  const fetchTasks = async () => {
    if (!token) {
      return;
    }

    setTaskLoading(true);
    setError("");

    try {
      const response = await axios.get(
        TASK_API,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (err) {
      console.error(
        "Error fetching tasks:",
        err
      );

      // ------------------------------------------------------
      // SESSION EXPIRED
      // ------------------------------------------------------

      if (err.response?.status === 401) {
        localStorage.removeItem(
          "taskmanager_token"
        );

        localStorage.removeItem(
          "taskmanager_user"
        );

        setToken("");
        setUser(null);
        setTasks([]);

        setError(
          "Your session has expired. Please login again."
        );
      }

      // ------------------------------------------------------
      // OTHER ERROR
      // ------------------------------------------------------

      else {
        setError(
          "Unable to load your tasks."
        );
      }
    } finally {
      setTaskLoading(false);
    }
  };

  // ==========================================================
  // LOAD TASKS AFTER LOGIN
  // ==========================================================

  useEffect(() => {
    if (token && user) {
      fetchTasks();
    }
  }, [token, user]);

  // ==========================================================
  // ADD TASK
  // ==========================================================

  const addTask = async (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.post(
        TASK_API,
        {
          title: taskTitle.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTaskTitle("");

      await fetchTasks();

      setSuccess(
        "Task created successfully."
      );
    } catch (err) {
      console.error(
        "Error adding task:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to add task."
      );
    }
  };

  // ==========================================================
  // TOGGLE TASK
  // ==========================================================

  const toggleTask = async (id) => {
    setError("");
    setSuccess("");

    try {
      await axios.put(
        `${TASK_API}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchTasks();
    } catch (err) {
      console.error(
        "Error updating task:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update task."
      );
    }
  };

  // ==========================================================
  // DELETE TASK
  // ==========================================================

  const deleteTask = async (id) => {
    setError("");
    setSuccess("");

    try {
      await axios.delete(
        `${TASK_API}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchTasks();
    } catch (err) {
      console.error(
        "Error deleting task:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to delete task."
      );
    }
  };

  // ==========================================================
  // AUTH PAGE
  // ==========================================================

  if (!user || !token) {
    return (
      <div className="auth-page">

        {/* ==================================================
            AUTH CARD
            ================================================== */}

        <div className="auth-card">

          {/* ==================================================
              BRAND
              ================================================== */}

          <div className="brand">

            <div className="brand-icon">
              NTC
            </div>

            <div>
              <h1>
                TaskManager
              </h1>

              <span>
                NTC Productivity Platform
              </span>
            </div>

          </div>

          {/* ==================================================
              AUTH HEADING
              ================================================== */}

          <div className="auth-heading">

            <h2>
              {authMode === "login"
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p>
              {authMode === "login"
                ? "Login to access your NTC tasks and dashboard."
                : "Register to access the NTC productivity platform."}
            </p>

          </div>

          {/* ==================================================
              ERROR MESSAGE
              ================================================== */}

          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          {/* ==================================================
              SUCCESS MESSAGE
              ================================================== */}

          {success && (
            <div className="alert success">
              {success}
            </div>
          )}

          {/* ==================================================
              AUTH FORM
              ================================================== */}

          <form onSubmit={handleAuth}>

            {/* ==================================================
                NAME
                ================================================== */}

            {authMode === "register" && (
              <div className="field">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />

              </div>
            )}

            {/* ==================================================
                EMAIL
                ================================================== */}

            <div className="field">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

            </div>

            {/* ==================================================
                PASSWORD
                ================================================== */}

            <div className="field">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                minLength={6}
                required
              />

            </div>

            {/* ==================================================
                SUBMIT BUTTON
                ================================================== */}

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : authMode === "login"
                ? "Login"
                : "Create Account"}
            </button>

          </form>

          {/* ==================================================
              AUTH MODE SWITCH
              ================================================== */}

          <div className="auth-switch">

            {authMode === "login" ? (
              <>
                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("register");
                    setError("");
                    setSuccess("");
                  }}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setError("");
                    setSuccess("");
                  }}
                >
                  Login
                </button>
              </>
            )}

          </div>

          {/* ==================================================
              BACK TO PORTALS
              ================================================== */}

          <button
            type="button"
            className="back-portal-button"
            onClick={backToPortals}
          >
            ← Back to Portals
          </button>

        </div>

      </div>
    );
  }

  // ==========================================================
  // DASHBOARD STATISTICS
  // ==========================================================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  // ==========================================================
  // DASHBOARD
  // ==========================================================

  return (
    <div className="dashboard">

      {/* ======================================================
          TOP BAR
          ====================================================== */}

      <header className="topbar">

        {/* ----------------------------------------------------
            BRAND
            ---------------------------------------------------- */}

        <div className="brand">

          <div className="brand-icon">
            NTC
          </div>

          <div>
            <h1>
              TaskManager
            </h1>

            <span>
              NTC Productivity Platform
            </span>
          </div>

        </div>

        {/* ----------------------------------------------------
            PROFILE
            ---------------------------------------------------- */}

        <div className="profile">

          <div className="profile-info">

            <strong>
              {user.name}
            </strong>

            <span>
              {user.role === "admin"
                ? "Administrator"
                : "NTC Staff"}
            </span>

          </div>

          <button
            className="logout-button"
            type="button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <main className="dashboard-content">

        {/* ====================================================
            WELCOME SECTION
            ==================================================== */}

        <div className="welcome">

          <div>

            <p className="eyebrow">
              NTC DASHBOARD
            </p>

            <h2>
              Welcome, {user.name}
            </h2>

            <p>
              {user.role === "admin"
                ? "Manage staff tasks and monitor team progress."
                : "View your assigned tasks and track your progress."}
            </p>

          </div>

          {/* --------------------------------------------------
              TOTAL TASKS
              -------------------------------------------------- */}

          <div className="stats-card">

            <span>
              Total Tasks
            </span>

            <strong>
              {tasks.length}
            </strong>

          </div>

        </div>

        {/* ====================================================
            ERROR
            ==================================================== */}

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        {/* ====================================================
            SUCCESS
            ==================================================== */}

        {success && (
          <div className="alert success">
            {success}
          </div>
        )}

        {/* ====================================================
            TASK PANEL
            ==================================================== */}

        <section className="task-panel">

          {/* --------------------------------------------------
              PANEL HEADER
              -------------------------------------------------- */}

          <div className="panel-header">

            <h3>
              {user.role === "admin"
                ? "NTC Task Management"
                : "My Tasks"}
            </h3>

            <p>
              {user.role === "admin"
                ? "Create and manage tasks for NTC staff."
                : "Tasks assigned to you by the NTC administrator."}
            </p>

          </div>

          {/* ==================================================
              ADMIN TASK CREATION
              ================================================== */}

          {user.role === "admin" && (
            <form
              className="task-form"
              onSubmit={addTask}
            >

              <input
                type="text"
                placeholder="Create a new NTC task..."
                value={taskTitle}
                onChange={(event) =>
                  setTaskTitle(event.target.value)
                }
              />

              <button type="submit">
                Create Task
              </button>

            </form>
          )}

          {/* ==================================================
              TASK STATISTICS
              ================================================== */}

          <div className="dashboard-stats">

            <div className="stats-card">

              <span>
                Pending
              </span>

              <strong>
                {pendingTasks}
              </strong>

            </div>

            <div className="stats-card">

              <span>
                Completed
              </span>

              <strong>
                {completedTasks}
              </strong>

            </div>

          </div>

          {/* ==================================================
              TASK CONTENT
              ================================================== */}

          {taskLoading ? (

            <div className="loading">
              Loading tasks...
            </div>

          ) : tasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                No tasks yet
              </h3>

              <p>
                {user.role === "admin"
                  ? "Create a task for your NTC team."
                  : "Your administrator has not assigned any tasks yet."}
              </p>

            </div>

          ) : (

            <ul className="task-list">

              {tasks.map((task) => (

                <li
                  key={task._id}
                  className={
                    task.completed
                      ? "done"
                      : ""
                  }
                >

                  {/* ------------------------------------------------
                      TASK TITLE
                      ------------------------------------------------ */}

                  <span>
                    {task.title}
                  </span>

                  {/* ------------------------------------------------
                      TASK ACTIONS
                      ------------------------------------------------ */}

                  <div className="task-actions">

                    <button
                      type="button"
                      onClick={() =>
                        toggleTask(task._id)
                      }
                    >
                      {task.completed
                        ? "Undo"
                        : "Complete"}
                    </button>

                    {user.role === "admin" && (
                      <button
                        type="button"
                        onClick={() =>
                          deleteTask(task._id)
                        }
                      >
                        Delete
                      </button>
                    )}

                  </div>

                </li>

              ))}

            </ul>

          )}

        </section>

      </main>

    </div>
  );
}

// ============================================================
// EXPORT
// ============================================================

export default App;
