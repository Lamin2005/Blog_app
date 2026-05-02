import {
  postCreate,
  postDelete,
  postDetail,
  posts,
  postUpdate,
  postSearch,
} from "../controllers/postController";
import express from "express";
import Postupload from "../middleware/Postupload";

const router = express.Router();

router.get("/", posts);
router.get("/post-detail/:id",postDetail);
router.post("/create", Postupload.single("image"), postCreate);
router.delete("/delete/:id", postDelete);
router.patch("/edit/:id", Postupload.single("image"), postUpdate);
router.get("/search", postSearch);


export default router;
