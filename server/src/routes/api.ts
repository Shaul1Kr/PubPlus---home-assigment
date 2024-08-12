import express from "express";
import auth from "./auth";
import user from "./user";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.use("/auth", auth);
router.use(verifyToken);
router.use("/user", user);

export default router;
