import { Request, Response } from "express";
import Post from "../models/postSchema";
import cloudinary from "../config/cloudinary";
import { AuthenticatedRequest } from "../middleware/authmiddleware";

export const posts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
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

    if (!exitPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (exitPost.image?.public_id) {
      await cloudinary.uploader.destroy(exitPost.image.public_id);
    }

    await Post.findByIdAndDelete(exitPost.id);

    res.status(200).json({
      message: "Post deleted successfully",
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

    const exitPost = await Post.findById(id);

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
    const search = req.query.q as string;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    if (!search || search.trim() === "") {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const skip = (page - 1) * limit;

    const query = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    console.log("Search Error:", error);

    res.status(500).json({
      message: "Server Error",
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
