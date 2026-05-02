import {
  login,
  register,
  profile,
  updateProfile,
  logout,
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

router.post("/logout", logout);

export default router;
