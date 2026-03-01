import * as authService from "./auth.service.js";
import { successResponse } from "../../common/utils/response/index.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.registerService(req.body);
    return successResponse(res, { message: "Registration successful", data });
  } catch (error) {
    next(error);
  }
};

export const confirmEmail = async (req, res, next) => {
  try {
    await authService.confirmEmailService(req.body);
    return successResponse(res, { message: "Email confirmed successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const tokens = await authService.loginService(req.body);
    return successResponse(res, { message: "Login successful", data: tokens });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshTokenService(refreshToken);
    return successResponse(res, { data: { accessToken } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authService.logoutService(req.user.id);
    return successResponse(res, { message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

export const loginWithGoogle = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const tokens = await authService.loginWithGoogleService(idToken);
    return successResponse(res, { data: tokens });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfileService(req.user.id);
    return successResponse(res, { data: user });
  } catch (error) {
    next(error);
  }
};