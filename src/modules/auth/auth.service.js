import { nanoid } from "nanoid";
import { OAuth2Client } from "google-auth-library";

import User from "../../DB/model/user.js";
import { createUser, findUserByEmail } from "../../DB/repository/user.repository.js";

import { hashPassword, comparePassword } from "../../common/security/hash.js";
import { encrypt } from "../../common/security/encryption.js";

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../common/security/token.js"; // NEW

import { emailEvent } from "../../common/events/email.event.js";
import { GOOGLE_CLIENT_ID } from "../../../config/config.service.js";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const registerService = async (body) => {
  const email = body.email.toLowerCase().trim();
  const exist = await findUserByEmail(email);
  if (exist) throw new Error("Email already exists");

  if (body.password !== body.confirmPassword) throw new Error("Passwords do not match");

  body.email = email;
  body.password = await hashPassword(body.password);

  if (body.phone) body.phone = encrypt(body.phone);

  body.otp = nanoid(6); // NEW
  body.otpExpires = Date.now() + 10 * 60 * 1000; // NEW

  const user = await createUser(body);

  emailEvent.emit("sendEmail", { to: user.email, otp: body.otp }); // NEW

  return user;
};

export const confirmEmailService = async ({ email, otp }) => {
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) throw new Error("User not found");
  if (user.isEmailConfirmed) throw new Error("Email already confirmed");
  if (user.otp !== otp) throw new Error("Invalid OTP");
  if (Date.now() > user.otpExpires) throw new Error("OTP expired");

  user.isEmailConfirmed = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return true;
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) throw new Error("Invalid credentials");
  if (!user.isEmailConfirmed) throw new Error("Email not confirmed");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken({ id: user._id, role: user.role }); // NEW
  const refreshToken = generateRefreshToken({ id: user._id }); // NEW

  user.refreshToken = refreshToken; // NEW
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshTokenService = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken); // NEW
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) throw new Error("Invalid refresh token");

  const accessToken = generateAccessToken({ id: user._id, role: user.role }); // NEW
  return accessToken;
};

export const logoutService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  user.refreshToken = null; // NEW
  await user.save();
};

export const loginWithGoogleService = async (idToken) => {
  const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  const email = payload.email;

  let user = await findUserByEmail(email);
  if (!user) {
    user = await createUser({ email, name: payload.name, isEmailConfirmed: true });
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role }); // NEW
  const refreshToken = generateRefreshToken({ id: user._id }); // NEW

  user.refreshToken = refreshToken; // NEW
  await user.save();

  return { accessToken, refreshToken };
};

export const getProfileService = async (id) => {
  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) throw new Error("User not found");
  return user;
};