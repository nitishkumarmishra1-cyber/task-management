# TaskHub — Task Management Application

A full-stack task management application built with the **MEAN stack** (MongoDB, Express, Angular, Node.js) featuring role-based authorization, JWT authentication, and Docker support for easy local development.

## Project Description

TaskHub is an internal task management system designed for organizations with a hierarchical team structure. It allows Managers to oversee all tasks across the organization, Team Leads to manage their team's tasks, and Employees to manage their own assigned tasks.

Think of it like an office's internal task tracker — similar to Jira or Trello — but with strict role-based visibility baked in: a Manager sees everything, a Team Lead sees only their team, and an Employee sees only their own work.

---

## Prerequisites

### To Run with Docker (Recommended — no Node/Angular needed locally)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### To Run Locally (Without Docker)
- Node.js v20.19 or v22.12+
- pnpm (`npm install -g pnpm`)
- MongoDB Atlas account (or local MongoDB installed)
- Angular CLI (`npm install -g @angular/cli`)

---

## Running with Docker (Recommended)

This is the easiest way to run the project — no Node, no Angular CLI, no MongoDB installation needed on your machine.

### Step 1 — Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### Step 2 — Create the Docker environment file

Copy the example env file and update the values:

```bash
cp server/.env.docker.example server/.env.docker
```

Open `server/.env.docker` and set your JWT secret:

```env
PORT=3000
NODE_ENV=development
MONGO_DB_URL=mongodb://mongodb:27017/task_management
JWT_SECRET_KEY=your-secret-key-here
```

> **Note:** `MONGO_DB_URL` points to the local MongoDB Docker container — do NOT change `mongodb` (the hostname) as it refers to the Docker service name, not `localhost`.

### Step 3 — Start all services

```bash
docker-compose up -d
```

This starts 3 containers:
| Container | URL | Description |
|---|---|---|
| `client` | http://localhost:4200 | Angular dev server with hot reload |
| `task-management-server` | http://localhost:3000 | Express API server with hot reload |
| `mongodb` | localhost:27017 | Local MongoDB (data persists across restarts) |

### Step 4 — Open the app

Visit **http://localhost:4200** in your browser.

### Viewing MongoDB data (without installing anything)

Since MongoDB runs inside Docker, you can inspect it using `mongosh` built into the container:

## Running Locally (Without Docker)

### Server

```bash
cd server
pnpm install
cp .env.example .env.development
pnpm run dev
```

### Client

```bash
cd client
pnpm install
pnpm start
```

---

## Environment Variables

### Server (`server/.env.docker` for Docker, `server/.env.development` for local)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Express server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGO_DB_URL` | MongoDB connection string | `mongodb://mongodb:27017/task_management` |
| `JWT_SECRET_KEY` | Secret key for signing JWT tokens | `your-secret-here` |

> **Important:** Never commit `.env` files to Git. Both `.env.development` and `.env.docker` are listed in `.gitignore` and `.dockerignore`.
