import { NODE_ENV } from "../../../../config/config.service.js";

export const ErrorResponse = (message, status = 500, extra = undefined) => {
  throw new Error(JSON.stringify({ message, status, extra }));
};

export const BadRequestException = (msg) =>
  ErrorResponse(msg || "Bad Request", 400);

export const UnauthorizedException = (msg) =>
  ErrorResponse(msg || "Unauthorized", 401);

export const NotFoundException = (msg) =>
  ErrorResponse(msg || "Not Found", 404);

export const globalErrorHandling = (error, req, res, next) => {
  try {
    const parsed = JSON.parse(error.message);
    return res.status(parsed.status).json({
      message: parsed.message,
      extra: parsed.extra,
    });
  } catch {
    return res.status(500).json({
      message:
        NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};