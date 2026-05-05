import Post from "../models/postSchema";
import { AuthenticatedRequest } from "./authmiddleware";
import { Response, NextFunction } from "express";

export const authorizedUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.user?.equals(req.user?._id)) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to perform this action",
      });
    }

    next();
    
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
