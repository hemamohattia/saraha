import fs from "fs";
import User from "../../DB/model/user.js";
import { hashPassword, comparePassword } from "../../common/security/hash.js";

export const getProfileService = async (id) => {
  const user = await User.findById(id).select("-password -refreshToken -otp -otpExpires");
  if (!user || user.isDeleted) throw Object.assign(new Error("User not found"), { status: 404 });
  user.visitCount += 1;
  await user.save();
  return user;
};

export const shareProfileService = async (id) => {
  const user = await User.findById(id).select("name email profileImage visitCount role");
  if (!user || user.isDeleted || user.isFrozen) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
};

export const updateAccountService = async (id, data) => {
  const forbidden = ["password", "role", "otp", "otpExpires", "refreshToken", "isDeleted", "isFrozen"];
  forbidden.forEach((k) => delete data[k]);

  const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .select("-password -refreshToken -otp -otpExpires");
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
};

export const updatePasswordService = async (id, { oldPassword, newPassword }) => {
  const user = await User.findById(id).select("+password +refreshToken");
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const match = await comparePassword(oldPassword, user.password);
  if (!match) throw Object.assign(new Error("Old password is incorrect"), { status: 400 });

  user.password = await hashPassword(newPassword);
  user.refreshToken = null;
  await user.save();
};

export const freezeAccountService = async (id) => {
  const user = await User.findByIdAndUpdate(id, { isFrozen: true }, { new: true });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
};

export const restoreAccountService = async (id) => {
  const user = await User.findByIdAndUpdate(id, { isFrozen: false, isDeleted: false }, { new: true });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
};

export const softDeleteAccountService = async (id) => {
  const user = await User.findByIdAndUpdate(id, { isDeleted: true, refreshToken: null }, { new: true });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
};

export const hardDeleteAccountService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const filesToDelete = [user.profileImage, ...user.coverImages, ...user.gallery].filter(Boolean);
  filesToDelete.forEach((filePath) => { try { fs.unlinkSync(filePath); } catch {} });

  await User.findByIdAndDelete(id);
};

export const uploadProfileImageService = async (id, file) => {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  if (user.profileImage) user.gallery.push(user.profileImage);
  user.profileImage = file.path;
  await user.save();
  return user;
};

export const removeProfileImageService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  if (!user.profileImage) throw Object.assign(new Error("No profile image to remove"), { status: 400 });

  try { fs.unlinkSync(user.profileImage); } catch {}
  user.profileImage = null;
  await user.save();
};

export const uploadCoverImagesService = async (id, files) => {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  user.coverImages.push(...files.map((f) => f.path));
  await user.save();
  return user;
};

export const getVisitCountService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return { visitCount: user.visitCount };
};