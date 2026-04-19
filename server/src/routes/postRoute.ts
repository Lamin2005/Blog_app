import { postCreate } from "../controllers/postController";
import express from "express";

const router = express.Router();

router.post("/create", postCreate);

export default router;
