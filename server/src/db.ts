import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./models/schema";

const client = new Client({
  connectionString: process.env.DB_URL,
});

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

export const db = drizzle(client, { schema });

export default client;
