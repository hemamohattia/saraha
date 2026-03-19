import mongoose from "mongoose";
import { DB_URL } from "../../config/config.service.js";

mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));