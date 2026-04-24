import {
  postCreate,
  postDelete,
  postDetail,
  posts,
  postUpdate,
} from "../controllers/postController";
import express from "express";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", posts);
router.get("/post-detail/:id",postDetail);
router.post("/create", upload.single("image"), postCreate);
router.delete("/delete/:id", postDelete);
router.patch("/edit/:id", upload.single("image"), postUpdate);

export default router;
