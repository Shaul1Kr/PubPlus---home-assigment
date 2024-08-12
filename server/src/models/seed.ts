import { drizzle } from "drizzle-orm/node-postgres";
import { users, statusEnum } from "./schema";
import { Client } from "pg";
import bcrypt from "bcrypt";
import { randomInt } from "crypto"; // Use crypto to generate a random number

// Initialize Drizzle ORM
const client = new Client({
  connectionString:
    "postgres://postgres:mysecretpassword@localhost:5431/PubPlus",
});

// Function to generate a random password
const generateRandomPassword = async () => {
  const saltRounds = 10;
  const plainPassword = Math.random().toString(36).slice(-8); // Generate a random string
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

// Define an async function to seed users
const seedUsers = async () => {
  try {
    await client.connect();
    const db = drizzle(client);

    const userRecords = [];
    for (let i = 1; i <= 10; i++) {
      const password = await generateRandomPassword();
      const randomStatusIndex = randomInt(0, statusEnum.enumValues.length); // Random number between 0 and 3

      userRecords.push({
        username: `user${i}`,
        password,
        status: statusEnum.enumValues[randomStatusIndex],
      });
    }

    // Insert users into the database
    await db.insert(users).values(userRecords);
    console.log("10 users have been created successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await client.end(); // Close the database connection properly
  }
};

// Run the seed script
seedUsers();
