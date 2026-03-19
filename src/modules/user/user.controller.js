import * as userService from "./user.service.js";
import { successResponse } from "../../common/utils/response/index.js";

export const getProfile = async (req, res, next) => {
  try {
    return successResponse(res, { data: await userService.getProfileService(req.user.id) });
  } catch (error) { next(error); }
};

export const shareProfile = async (req, res, next) => {
  try {
    return successResponse(res, { data: await userService.shareProfileService(req.params.id) });
  } catch (error) { next(error); }
};

export const updateAccount = async (req, res, next) => {
  try {
    return successResponse(res, { message: "Account updated", data: await userService.updateAccountService(req.user.id, req.body) });
  } catch (error) { next(error); }
};

export const updatePassword = async (req, res, next) => {
  try {
    await userService.updatePasswordService(req.user.id, req.body);
    return successResponse(res, { message: "Password updated successfully" });
  } catch (error) { next(error); }
};

export const freezeAccount = async (req, res, next) => {
  try {
    await userService.freezeAccountService(req.user.id);
    return successResponse(res, { message: "Account frozen" });
  } catch (error) { next(error); }
};

export const restoreAccount = async (req, res, next) => {
  try {
    await userService.restoreAccountService(req.user.id);
    return successResponse(res, { message: "Account restored" });
  } catch (error) { next(error); }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await userService.softDeleteAccountService(req.user.id);
    return successResponse(res, { message: "Account deleted" });
  } catch (error) { next(error); }
};

export const hardDeleteAccount = async (req, res, next) => {
  try {
    await userService.hardDeleteAccountService(req.user.id);
    return successResponse(res, { message: "Account permanently deleted" });
  } catch (error) { next(error); }
};

export const uploadProfileImage = async (req, res, next) => {
  try {
    return successResponse(res, { message: "Profile image uploaded", data: await userService.uploadProfileImageService(req.user.id, req.file) });
  } catch (error) { next(error); }
};

export const removeProfileImage = async (req, res, next) => {
  try {
    await userService.removeProfileImageService(req.user.id);
    return successResponse(res, { message: "Profile image removed" });
  } catch (error) { next(error); }
};

export const uploadCoverImages = async (req, res, next) => {
  try {
    return successResponse(res, { message: "Cover images uploaded", data: await userService.uploadCoverImagesService(req.user.id, req.files) });
  } catch (error) { next(error); }
};

export const getVisitCount = async (req, res, next) => {
  try {
    return successResponse(res, { data: await userService.getVisitCountService(req.user.id) });
  } catch (error) { next(error); }
};