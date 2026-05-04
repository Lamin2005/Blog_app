import { Request, Response } from "express";
import Post from "../models/postSchema";
import cloudinary from "../config/cloudinary";
import { AuthenticatedRequest } from "../middleware/authmiddleware";

export const posts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.status(201).json({
      message: "Post get successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

export const postDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    const userdata = await post?.populate("user", "name images");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postData = {
      _id: post._id,
      title: post.title,
      description: post.description,
      image: post.image,
      category: post.category,
      readTime: post.readTime,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: userdata?.user,
    };

    res.status(200).json({ data: postData });
  } catch (error) {
    console.log("Error getting Detail post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const postCreate = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, category } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Post Create Unauthorized",
      });
    }

    const file = req.file as Express.Multer.File;
    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required.",
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "Image is Required!",
      });
    }

    const newPost = new Post({
      title,
      description,
      image: {
        url: file.path,
        public_id: file.filename,
      },
      category,
      user: user._id,
    });

    const savePost = await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      data: savePost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

export const postDelete = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const exitPost = await Post.findById(id);
    const user = req.user;

    if (user?._id != exitPost?.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!exitPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (exitPost.image?.public_id) {
      await cloudinary.uploader.destroy(exitPost.image.public_id);
    }

    const deletePost = await Post.findByIdAndDelete(exitPost.id);

    res.status(200).json({
      message: "Post deleted successfully",
      data: deletePost,
    });
  } catch (error) {
    console.log("Delete Post Error : ", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const postUpdate = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body || {};
    const user = req.user;

    const exitPost = await Post.findById(id);

    if (user?._id != exitPost?.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!exitPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (req.file) {
      const file = req.file as Express.Multer.File;

      if (exitPost.image?.public_id) {
        await cloudinary.uploader.destroy(exitPost.image.public_id);
      }

      exitPost.image = {
        url: file.path,
        public_id: file.filename,
      };
    }

    if (title) exitPost.title = title;
    if (description) exitPost.description = description;
    if (category) exitPost.category = category;

    const updatePost = await exitPost.save();

    res.status(200).json({
      message: "Post update successfully",
      data: updatePost,
    });
  } catch (error) {
    console.log("Update Post Error : ", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const postSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({
        message: "Query parameter 'q' is required",
      });
    }

    if (q.trim().length < 5) {
      return res.status(400).json({
        message: "Search must be at least 5 characters",
      });
    }

    const escapeRegex = (text: string) =>
      text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const searchRegex = new RegExp(escapeRegex(q), "i");

    const posts = await Post.find({
      $or: [{ title: { $regex: searchRegex } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

export const userPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const posts = await Post.find({ user: user._id });
    res.status(200).json({
      message: "User posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Error getting user posts:", error);
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};
