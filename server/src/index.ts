import express from "express";
import { client } from "./models/drizzle/db";
import cookieParser from "cookie-parser";
import api from "./routes/api";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", api);

const PORT = process.env.PORT || 3000;

// Initialize database connection and start server
app.listen(PORT, async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
