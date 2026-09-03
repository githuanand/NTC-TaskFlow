# NTC Task Manager — AI-Powered Task Management, Progress Analysis, Work Assignment & Results Tracking Platform

A full-stack academic task management platform developed for **NTC – Narayan Tuition Classes**, combining modern web technologies with AI-assisted capabilities for structured task management, progress analysis, work assignment, and results tracking.

> **Project Status:** Core MERN functionality is implemented. AI-powered analysis, advanced analytics, and Google Classroom integration are under development.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 👥 Role-based access
- 📝 Task creation, updating and deletion
- ✅ Task completion and status tracking
- 📊 Dashboard and task statistics
- 💾 Persistent MongoDB storage
- 🔒 Secure password hashing with bcrypt
- ⚡ RESTful backend APIs
- 📱 Responsive user interface
- 🛡️ Protected backend routes

---

## 🧠 Technology Stack

**Frontend**
- React.js
- Vite
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

**Database**
- MongoDB Atlas

**Under Development**
- Generative AI
- AI-powered analysis
- Progress analytics
- Google Classroom integration

---

## 🏗️ Architecture

```text
                    NTC TASK MANAGER
                           │
             ┌─────────────┴─────────────┐
             │                           │
      React Frontend              Express Backend
          (Vite)                     (Node.js)
             │                           │
             │         REST API           │
             └─────────────┬─────────────┘
                           │
                      MongoDB Atlas


### 📂 Project Structure

TaskManager/
│
├── backend/
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Todo.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

#SECURITY

The application uses:

JWT authentication
bcrypt password hashing
Protected API routes
Role-based authorization
Environment variables for sensitive configuration
.env excluded from Git

Sensitive credentials and database connection strings are not included in the repository.

# DEVELOPMENT STATUS

| Component                    | Status               |
| ---------------------------- | -------------------- |
| React Frontend               | ✅ Implemented        |
| Vite Production Build        | ✅ Working            |
| Node.js Backend              | ✅ Implemented        |
| Express REST API             | ✅ Working            |
| MongoDB Integration          | ✅ Working            |
| JWT Authentication           | ✅ Implemented        |
| Task Management              | ✅ Implemented        |
| Dashboard                    | ✅ Implemented        |
| Responsive UI                | ✅ Implemented        |
| Production Deployment        | 🚧 In Progress       |
| AI-Powered Analysis          | 🚧 Under Development |
| Progress Analytics           | 🚧 Under Development |
| Google Classroom Integration | 🚧 Under Development |

☁️ Deployment

The planned production architecture is:

┌─────────────────────┐
│       Vercel        │
│   React Frontend    │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│       Render        │
│  Node/Express API   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     MongoDB Atlas   │
│      Database       │
└─────────────────────┘

🎓 Project

NTC – Narayan Tuition Classes

NTC Task Manager is an ongoing software development project focused on structured academic task management, work assignment, progress analysis, and results tracking.

👨‍💻 Developer
Anand Mohan Jha
Sotware Development Engineer

📌 Status
Core MERN platform: Operational
AI & Advanced Analytics: Under Development
Google Classroom Integration: Under Development
Production Deployment: In Progress

### License
-This project is maintained as an institutional project for NTC – Narayan Tuition Classes.
