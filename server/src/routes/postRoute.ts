import {
  postCreate,
  postDelete,
  posts,
  postUpdate,
} from "../controllers/postController";
import express from "express";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", posts);
router.post("/create", upload.single("image"), postCreate);
router.delete("/delete/:id", postDelete);
router.patch("/update/:id", upload.single("image"), postUpdate);

export default router;
