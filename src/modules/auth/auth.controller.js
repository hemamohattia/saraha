import * as authService from "./auth.service.js";
import { successResponse } from "../../common/utils/response/index.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.registerService(req.body);
    return successResponse(res, { message: "Registration successful. Check your email for OTP.", data, status: 201 });
  } catch (error) { next(error); }
};

export const confirmEmail = async (req, res, next) => {
  try {
    await authService.confirmEmailService(req.body);
    return successResponse(res, { message: "Email confirmed successfully" });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.loginService(req.body);
    return successResponse(res, { message: "Login successful", data });
  } catch (error) { next(error); }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshTokenService(refreshToken);
    return successResponse(res, { data: { accessToken } });
  } catch (error) { next(error); }
};

export const logout = async (req, res, next) => {
  try {
    await authService.logoutService(req.user.id);
    return successResponse(res, { message: "Logged out successfully" });
  } catch (error) { next(error); }
};

export const loginWithGoogle = async (req, res, next) => {
  try {
    const data = await authService.loginWithGoogleService(req.body.idToken);
    return successResponse(res, { data });
  } catch (error) { next(error); }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPasswordService(req.body);
    return successResponse(res, { message: "OTP sent to your email" });
  } catch (error) { next(error); }
};

export const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPasswordService(req.body);
    return successResponse(res, { message: "Password reset successfully" });
  } catch (error) { next(error); }
};