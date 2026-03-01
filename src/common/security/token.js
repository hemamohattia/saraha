import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../../../config/config.service.js";

export const generateAccessToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

export const verifyAccessToken = (token) =>
  jwt.verify(token, JWT_SECRET);

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

export const verifyRefreshToken = (token) =>
  jwt.verify(token, JWT_REFRESH_SECRET);