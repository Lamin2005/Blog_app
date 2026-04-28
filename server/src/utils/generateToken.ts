import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (userid: Types.ObjectId) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d",
  });

  return token;
};
