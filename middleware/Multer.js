import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "../models/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});


