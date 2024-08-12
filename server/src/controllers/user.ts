import { Request, Response } from "express";
import { statusEnum, users } from "../models/drizzle/schema";
import { db } from "../models/drizzle/db";
import { and, eq, ilike, like } from "drizzle-orm";

type Status = "Working" | "Working Remotely" | "On Vacation" | "Business Trip";

const validStatuses: Status[] = [
  "Working",
  "Working Remotely",
  "On Vacation",
  "Business Trip",
];

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { username, status } = req.body;
    console.log(
      `Updating user status with username: ${username} and status: ${status}`
    );
    if (!Object.values(statusEnum).includes(status))
      return res.status(400).json({ message: "Invalid status" });
    const user = await db
      .update(users)
      .set({ status })
      .where(eq(users.username, username));
    return res
      .status(200)
      .json({ message: "Status updated successfully", user });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("Fatching all users");

    const users = await db.query.users.findMany();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const filterUsersByStatus = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.body;
    console.log(
      `Fetching users with status: ${status} and search term: ${search}`
    );
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const usersFiltered = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.status, status as Status),
          like(users.username, `%${search}%`)
        )
      );
    return res.status(200).json(usersFiltered);
  } catch (error) {
    console.error("Error filtering users by status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
