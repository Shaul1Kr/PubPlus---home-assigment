import { sql } from "drizzle-orm";
import { pgTable, text, uuid, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "Working",
  "Working Remotely",
  "On Vacation",
  "Business Trip",
]);

// Define the User table schema
export const users = pgTable("users", {
  uid: uuid("uid")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  status: statusEnum("status").default("Working").notNull(),
});
