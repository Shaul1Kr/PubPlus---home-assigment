import express from "express";
import { connectToDatabase } from "./db"; // Adjust the path to your db.ts file

const app = express();

const PORT = process.env.PORT || 3000;

// Initialize database connection and start server
const startServer = async () => {
  await connectToDatabase(); // Wait for the database to connect

  // Middleware and routes setup here
  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1); // Exit if server fails to start
});
