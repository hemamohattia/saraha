import { Router } from "express";
import * as messageController from "./message.controller.js";
import { authentication } from "../../common/middleware/auth.middleware.js";

const router = Router();

router.post("/send", authentication, messageController.sendMessage);
router.get("/conversation/:userId", authentication, messageController.listMessages);
router.get("/:id", authentication, messageController.getMessageById);
router.delete("/:id", authentication, messageController.deleteMessage);

export default router;