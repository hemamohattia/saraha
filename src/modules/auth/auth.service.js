import { OAuth2Client } from "google-auth-library";
import User from "../../DB/model/user.js";
import { createUser, findUserByEmail } from "../../DB/repository/user.repository.js";
import { hashPassword, comparePassword } from "../../common/security/hash.js";
import { encrypt } from "../../common/security/encryption.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../common/security/token.js";
import { emailEvent } from "../../common/events/email.event.js";
import { GOOGLE_CLIENT_ID } from "../../../config/config.service.js";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const generateNumericOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export const registerService = async (body) => {
  const email = body.email.toLowerCase().trim();
  const exist = await findUserByEmail(email);
  if (exist) throw Object.assign(new Error("Email already exists"), { status: 409 });

  const otp = generateNumericOtp();
  const user = await createUser({
    name: body.name,
    email,
    password: await hashPassword(body.password),
    phone: body.phone ? encrypt(body.phone) : undefined,
    otp,
    otpExpires: new Date(Date.now() + 10 * 60 * 1000),
  });

  emailEvent.emit("sendEmail", { to: email, otp, title: "Confirm your email" });
  return { id: user._id, email: user.email, name: user.name };
};

export const confirmEmailService = async ({ email, otp }) => {
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  if (user.isEmailConfirmed) throw Object.assign(new Error("Email already confirmed"), { status: 400 });
  if (user.otp !== otp) throw Object.assign(new Error("Invalid OTP"), { status: 400 });
  if (Date.now() > user.otpExpires) throw Object.assign(new Error("OTP expired"), { status: 400 });

  user.isEmailConfirmed = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user || !user.password) throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  if (!user.isEmailConfirmed) throw Object.assign(new Error("Please confirm your email first"), { status: 403 });
  if (user.isFrozen) throw Object.assign(new Error("Account is frozen"), { status: 403 });
  if (user.isDeleted) throw Object.assign(new Error("Account not found"), { status: 404 });

  const match = await comparePassword(password, user.password);
  if (!match) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshTokenService = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || user.refreshToken !== refreshToken)
    throw Object.assign(new Error("Invalid refresh token"), { status: 401 });

  return generateAccessToken({ id: user._id, role: user.role });
};

export const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { refreshToken: null });
};

export const loginWithGoogleService = async (idToken) => {
  const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
  const { email, name } = ticket.getPayload();

  let user = await findUserByEmail(email);
  if (!user) {
    user = await createUser({ email, name, isEmailConfirmed: true, password: undefined });
  }
  if (user.isFrozen) throw Object.assign(new Error("Account is frozen"), { status: 403 });

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const forgotPasswordService = async ({ email }) => {
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const otp = generateNumericOtp();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  emailEvent.emit("sendEmail", { to: email, otp, title: "Reset your password" });
};

export const resetPasswordService = async ({ email, otp, newPassword }) => {
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  if (user.otp !== otp) throw Object.assign(new Error("Invalid OTP"), { status: 400 });
  if (Date.now() > user.otpExpires) throw Object.assign(new Error("OTP expired"), { status: 400 });

  user.password = await hashPassword(newPassword);
  user.otp = undefined;
  user.otpExpires = undefined;
  user.refreshToken = null;
  await user.save();
};