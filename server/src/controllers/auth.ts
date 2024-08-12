import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../models/drizzle/db";
import { eq } from "drizzle-orm";
import { users } from "../models/drizzle/schema";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(
      `Trying to login with username: ${username} and password: ${password}`
    );
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!user) {
      console.log("username or password are incorrect");
      return res
        .status(401)
        .json({ message: "username or password are incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("username or password are incorrect");
      return res
        .status(401)
        .json({ message: "username or password are incorrect" });
    }
    const token = jwt.sign(
      { id: user.uid, username: user.username, status: user.status },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      }
    );
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send("Login successfully");
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
