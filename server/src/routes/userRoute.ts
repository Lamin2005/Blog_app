import {
  login,
  register,
  profile,
  updateProfile,
  logout,
  userProfile,
} from "../controllers/userController";
import express from "express";
import { authMiddleware } from "../middleware/authmiddleware";
import Userupload from "../middleware/Userupload";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router
  .route("/profile")
  .get(authMiddleware, profile)
  .put(authMiddleware,Userupload.single("image"), updateProfile);

router.post("/logout", logout);
router.get("/:id", userProfile);

export default router;
