import * as userService from "./user.service.js";
import { successResponse } from "../../common/utils/response/index.js";

export const getProfile = async (req, res, next) => {
    try {
        const data = await userService.getProfileService(req.user.id);
        return successResponse(res, { data });
    } catch (error) {
        next(error);
    }
};

export const updateAccount = async (req, res, next) => {
    try {
        const data = await userService.updateAccountService(req.user.id, req.body);
        return successResponse(res, { message: "Account updated successfully", data });
    } catch (error) {
        next(error);
    }
};