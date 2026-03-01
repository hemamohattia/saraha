import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authentication } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { registerSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/confirm-email", authController.confirmEmail);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authentication, authController.logout);
router.post("/google", authController.loginWithGoogle);
router.get("/profile", authentication, authController.getProfile);

export default router;