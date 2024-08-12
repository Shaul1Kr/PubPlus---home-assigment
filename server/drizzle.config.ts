import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/models/schema.ts",
  out: "./src/models/drizzle",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});
