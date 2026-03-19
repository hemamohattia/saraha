import * as messageService from "./message.service.js";
import { successResponse } from "../../common/utils/response/index.js";

export const sendMessage = async (req, res, next) => {
  try {
    const data = await messageService.sendMessageService(req.user.id, req.body);
    return successResponse(res, { message: "Message sent", data, status: 201 });
  } catch (error) { next(error); }
};

export const listMessages = async (req, res, next) => {
  try {
    const data = await messageService.listMessagesService(req.user.id, req.params.userId);
    return successResponse(res, { data });
  } catch (error) { next(error); }
};

export const getMessageById = async (req, res, next) => {
  try {
    const data = await messageService.getMessageByIdService(req.user.id, req.params.id);
    return successResponse(res, { data });
  } catch (error) { next(error); }
};

export const deleteMessage = async (req, res, next) => {
  try {
    await messageService.deleteMessageService(req.user.id, req.params.id);
    return successResponse(res, { message: "Message deleted" });
  } catch (error) { next(error); }
};