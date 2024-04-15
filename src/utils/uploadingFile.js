import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadImage = async (image, path, maxSizeKb = 50) => {
  const maxSize = 1024 * maxSizeKb; // 50kb

  const acceptedFiles = ["image/jpeg", "image/png"];

  if (image.size > maxSize) {
    fs.unlinkSync(image.tempFilePath);
    throw new Error("File too large");
  }

  if (!acceptedFiles.includes(image.mimetype)) {
    fs.unlinkSync(image.tempFilePath);
    throw new Error("Invalid Image Type");
  }

  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    unique_filename: true,
    folder: path,
  });

  fs.unlinkSync(image.tempFilePath);

  return result.secure_url;
};
