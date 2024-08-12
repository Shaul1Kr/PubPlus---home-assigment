import express from "express";
import { client, db } from "./models/drizzle/db";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { resolve } from "path";
import api from "./routes/api";

const app = express();
app.use(express.json());
app.use("/api", api);

const PORT = process.env.PORT || 3000;

// Initialize database connection and start server
app.listen(PORT, async () => {
  try {
    await client.connect();
    await migrate(db, {
      migrationsFolder: resolve(__dirname, "./models/drizzle"),
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
