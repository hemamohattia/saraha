import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "production";
export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL || "mongodb+srv://hemamohattia_db_user:hema2004@cluster0.ejqzjs8.mongodb.net/saraha";
export const JWT_SECRET = process.env.JWT_SECRET || "s@r@h@_@cc3ss_s3cr3t_k3y_2024!";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "s@r@h@_r3fr3sh_s3cr3t_k3y_2024!";
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "a1b2c3d4e5f6789012345678901234ab";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const EMAIL_USER = process.env.EMAIL_USER || "ibrahim.mohamed.attia2004@gmail.com";
export const EMAIL_PASS = process.env.EMAIL_PASS || "evhrlhwxssgsrjib";