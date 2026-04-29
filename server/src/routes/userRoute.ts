import {
  login,
  register,
  profile,
  updateProfile,
} from "../controllers/userController";
import express from "express";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router
  .route("/profile")
  .get(authMiddleware, profile)
  .put(authMiddleware, updateProfile);

export default router;
