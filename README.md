Here's the updated README file:

---

# PubPlush - Home Assignment

## Project Overview

This project is a full-stack application that consists of a backend and a frontend. The backend is built with Node.js and Express, using a PostgreSQL database, and is containerized using Docker. The frontend is built with React and is served using Vite.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed on your machine.

### Backend Setup

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Start the Docker containers:**

   ```bash
   docker compose -f "docker-compose.yml" up -d --build
   ```

   This will build the Docker images and start the containers in detached mode.

3. **Initialize the database and seed users (only required the first time):**

   Open another terminal and run the following commands:

   ```bash
   cd server
   npm i
   npm run migrate
   npm run seeding
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm i
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will start the frontend on `http://localhost:5173`.

### Environment Variables

Make sure the following environment variables are set up in your `.env` file:

```bash
PORT=3000
DB_HOST=server-db-1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=PubPlus
DB_URL=postgres://postgres:password@localhost:5431
JWT_SECRET=6f7cff6a3c9494e31cb86e7d537a770f2c9ce0615a1380ccd4c12c1bc7675525
```

## Additional Notes

- Ensure Docker is running before starting the backend.
- The frontend runs on `http://localhost:5173` by default.
- The JWT secret should be kept secure.

---

This version reflects the correct port for the frontend.
