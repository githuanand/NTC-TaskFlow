# NTC Task Manager

## AI-Powered Task Management, Progress & Analytics Platform

NTC Task Manager is a full-stack task management and academic productivity platform being developed for **NTC – Narayan Tuition Classes**.

The platform is designed to provide a structured digital environment for managing tasks, tracking progress, and supporting academic workflows through a modern web application.

> **Project Status:** Core MERN functionality is operational. AI-powered analysis and Google Classroom integration are currently under development.

---

## Overview

NTC Task Manager provides a centralized platform for managing and monitoring academic tasks.

The current application includes:

- User authentication
- Role-based access
- Task creation and management
- Task status tracking
- Task completion workflow
- Persistent database storage
- RESTful backend APIs
- Responsive web interface
- Dashboard-based task overview

The platform is being progressively extended with intelligent analysis and external academic-service integrations.

---

## Current Features

### Authentication

- User registration
- Secure login
- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- Authentication-aware frontend navigation

### Task Management

- Create tasks
- Update tasks
- Delete tasks
- Mark tasks as completed
- View task status
- Persistent task storage

### Dashboard

- User-specific dashboard
- Task overview
- Task statistics
- Empty-state handling
- Responsive interface
- Authentication-based access

### Backend

- RESTful API architecture
- Express.js server
- MongoDB database integration
- Mongoose data models
- Authentication middleware
- Protected routes
- CORS configuration
- Environment-based configuration

---

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Planned / Under Development

- Generative AI
- AI-assisted task analysis
- Progress analytics
- Google Classroom integration
- Advanced academic insights

---

## Architecture

```text
NTC Task Manager
│
├── frontend/
│   ├── React
│   ├── Vite
│   ├── React Router
│   ├── Axios
│   └── CSS
│
├── backend/
│   ├── Express.js
│   ├── Routes
│   ├── Middleware
│   ├── Models
│   └── Authentication
│
└── MongoDB
    └── Persistent Application Data

## ---------------------------------------------------------------------------------------------------------------------------

The application follows a separation between the frontend client, backend API, and database layer.

# Project Structure

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
│   ├── package.json
│   ├── server.js
│   └── resetDatabase.js
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

# API

The backend currently exposes endpoints for:

# Authentication
`/api/auth`
