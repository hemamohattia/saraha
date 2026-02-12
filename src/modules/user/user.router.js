import { Router } from "express";
import * as userController from "./user.controller.js";
import { authentication } from "../../common/middleware/auth.middleware.js";

const router = Router();

router.get("/profile", authentication, userController.getProfile);
router.put("/update", authentication, userController.updateAccount);

export default router;