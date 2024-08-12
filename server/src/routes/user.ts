import express from "express";
import {
  filterUsersByStatus,
  getAllUsers,
  getUserData,
  updateUserStatus,
} from "../controllers/user";
const router = express.Router();

router.post("/update-status", updateUserStatus);
router.post("/users/filter", filterUsersByStatus);
router.get("/users", getAllUsers);
router.get("/userData", getUserData);

export default router;
