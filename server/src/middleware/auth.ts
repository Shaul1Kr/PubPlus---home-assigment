import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token and extract the decoded data
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Assign the decoded information to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
