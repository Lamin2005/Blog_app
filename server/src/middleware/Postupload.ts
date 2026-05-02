import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const Poststorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_posts",
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

const Postupload = multer({
  storage: Poststorage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export default Postupload;
