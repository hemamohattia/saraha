import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authentication } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import {
  registerSchema, loginSchema, confirmEmailSchema,
  forgotPasswordSchema, resetPasswordSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/confirm-email", validate(confirmEmailSchema), authController.confirmEmail);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authentication, authController.logout);
router.post("/google", authController.loginWithGoogle);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

export default router;