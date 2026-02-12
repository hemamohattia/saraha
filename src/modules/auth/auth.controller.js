import { registerService, loginService } from "./auth.service.js";
import { successResponse } from "../../common/utils/response/index.js";

export const register = async (req, res, next) => {
    try {
        const data = await registerService(req.body);
        return successResponse(res, { 
            message: "Registration successful", 
            data 
        }, 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const token = await loginService(req.body);
        return successResponse(res, { 
            message: "Login successful", 
            data: { token } 
        });
    } catch (error) {
        next(error);
    }
};