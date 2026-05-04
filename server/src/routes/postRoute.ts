import {
  postCreate,
  postDelete,
  postDetail,
  posts,
  postUpdate,
  postSearch,
  userPosts,
} from "../controllers/postController";
import express from "express";
import Postupload from "../middleware/Postupload";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router();

router.get("/", posts);
router.get("/post-detail/:id", postDetail);
router.post("/create", authMiddleware, Postupload.single("image"), postCreate);
router.delete("/delete/:id", authMiddleware, postDelete);
router.patch(
  "/edit/:id",
  authMiddleware,
  Postupload.single("image"),
  postUpdate,
);
router.get("/search", postSearch);
router.get("/my-posts", authMiddleware, userPosts);

export default router;
