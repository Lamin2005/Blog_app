import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const Userstorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_posts",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  } as any,
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const Userupload = multer({
  storage: Userstorage,
  fileFilter,
});

export default Userupload;
