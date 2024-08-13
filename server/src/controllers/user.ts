import { Request, Response } from "express";
import { statusEnum, users } from "../models/drizzle/schema";
import { db } from "../models/drizzle/db";
import { and, eq, ilike, like } from "drizzle-orm";
import { IGetUserAuthInfoRequest } from "../middleware/auth";

type Status = "Working" | "Working Remotely" | "On Vacation" | "Business Trip";

const validStatuses: Status[] = [
  "Working",
  "Working Remotely",
  "On Vacation",
  "Business Trip",
];

export const updateUserStatus = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const { status } = req.body;
    console.log(`Updating user status: ${status}`);

    if (!Object.values(validStatuses).includes(status)) {
      console.error("Invalid status");
      return res.status(400).json({ message: "Invalid status" });
    }
    if (!req.user) {
      console.error("No user provided");
      return res.status(400).json({ message: "No user provided" });
    }
    const user = await db
      .update(users)
      .set({ status })
      .where(eq(users.uid, req.user.id));

    return res
      .status(200)
      .json({ message: "Status updated successfully", user });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    console.log("Fatching all users");
    const users = await db.query.users.findMany();
    return res.json({ users });
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
    let usersFiltered;
    if (status === "") {
      usersFiltered = await db
        .select()
        .from(users)
        .where(like(users.username, `%${search}%`));
    } else {
      usersFiltered = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.status, status as Status),
            like(users.username, `%${search}%`)
          )
        );
    }
    console.log({ usersFiltered, status });

    return res.status(200).json(usersFiltered);
  } catch (error) {
    console.error("Error filtering users by status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserData = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    console.info(`Retriving user data`);
    if (!req.user) return res.status(404).json({ message: "User not found" });
    const user = await db.query.users.findFirst({
      where: eq(users.uid, req.user.id),
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const userData = {
      uid: user.uid,
      username: user.username,
      status: user.status,
    };
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
