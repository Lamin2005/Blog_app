import { postCreate } from "../controllers/postController";
import express from "express";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/create",upload.single("image"), postCreate);

export default router;
