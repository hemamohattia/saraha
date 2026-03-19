import { NODE_ENV } from "../../../../config/config.service.js";

export const successResponse = (res, { message = "Success", data = null, status = 200 } = {}) =>
  res.status(status).json({ success: true, message, data });

export const globalErrorHandling = (error, req, res, next) => {
  const status = error.status ?? error.cause?.status ?? 500;
  const isProd = NODE_ENV === "production";
  return res.status(status).json({
    success: false,
    message: isProd && status === 500 ? "Something went wrong" : error.message,
    stack: isProd ? undefined : error.stack,
  });
};