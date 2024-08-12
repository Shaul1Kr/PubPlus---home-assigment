import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define the interface for the request including the user
export interface IGetUserAuthInfoRequest extends Request {
  user?: JwtPayload | string;
}

// Middleware function to verify JWT token
export default function verifyToken(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["access_token"];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).json({ message: "Token verification failed" });
      }
      req.user = decoded;
      next();
    }
  );
}
