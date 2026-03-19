import crypto from "crypto";
import { ENCRYPTION_KEY } from "../../../config/config.service.js";

const IV_LENGTH = 16;
const KEY = Buffer.from(ENCRYPTION_KEY, "hex");

export const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", KEY, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (encryptedData) => {
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};