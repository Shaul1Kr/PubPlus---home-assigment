import express from "express";
import {
  filterUsersByStatus,
  getAllUsers,
  updateUserStatus,
} from "../controllers/user";
const router = express.Router();

router.post("/update-status", updateUserStatus);
router.post("/users/filter", filterUsersByStatus);
router.get("/users", getAllUsers);

export default router;
