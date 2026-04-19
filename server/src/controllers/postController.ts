import { Request, Response } from "express";
import Post from "../models/postScema";

export const postCreate = async (req: Request, res: Response) => {
  const { title, description, image, category } = req.body;
  try {
    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required.",
      });
    }

    const newPost = new Post({
      title,
      description,
      image,
      category,
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
