import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "src/uploads/gallery";
    if (file.fieldname === "image") folder = "src/uploads/profile";
    else if (file.fieldname === "images") folder = "src/uploads/cover";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });