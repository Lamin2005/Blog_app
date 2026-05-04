import { Request, Response } from "express";
import User from "../models/userSchema";
import { generateToken } from "../utils/generateToken";
import { AuthenticatedRequest } from "../middleware/authmiddleware";
import cloudinary from "../config/cloudinary";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body || {};
    const file = req.file as Express.Multer.File;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      images: {
        url: "",
        public_id: "",
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.isMatched(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (user && isPasswordValid) {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    res.status(200).json({
      message: "Login successful",
      data: user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
     res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const profile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User profile",
      data: user,
    });
  } catch (error) {
    console.log("Profile Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const user = req.user?._id;
    const { name, email, password } = req.body;

    if (!user) {
      return res.status(404).json({
        message: "No Authenicated!",
      });
    }

    const existingUser = await User.findById(user._id);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.file) {
      const file = req.file as Express.Multer.File;

      if (existingUser.images?.public_id) {
        await cloudinary.uploader.destroy(existingUser.images.public_id);
      }

      existingUser.images = {
        url: file.path,
        public_id: file.filename,
      };
    }

    if (name) existingUser.name = name ?? existingUser.name;
    if (email) existingUser.email = email ?? existingUser.email;
    if (password) existingUser.password = password ?? existingUser.password;

    const updatedUser = await existingUser.save();

    const userData = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      images: updatedUser.images,
    };

    res.status(200).json({
      message: "Profile updated successfully",
      data: userData,
    });
  } catch (error) {
    console.log("Update Profile Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
