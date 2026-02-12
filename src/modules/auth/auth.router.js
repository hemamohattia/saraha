import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { successResponse } from "../../common/utils/response/index.js";

const router = Router();

router.get("/", (req, res) => {
    return successResponse(res, { message: "Auth route" });
});

router.post("/register", register);
router.post("/login", login);

export default router;