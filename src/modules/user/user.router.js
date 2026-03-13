import { Router } from "express"
import * as userController from "./user.controller.js"
import { authentication } from "../../common/middleware/auth.middleware.js"
import { authorization } from "../../common/middleware/authorization.middleware.js"
import { upload } from "../../common/utils/upload.js"

const router = Router()

router.get(
"/profile",
authentication,
userController.getProfile
)

router.put(
"/update",
authentication,
userController.updateAccount
)

router.post(
"/profile-image",
authentication,
upload.single("image"),
userController.uploadProfileImage
)

router.delete(
"/profile-image",
authentication,
userController.removeProfileImage
)

router.post(
  "/cover-images",
  authentication,
  upload.array("images"),
  userController.uploadCoverImages
)

router.get(
  "/visit-count",
  authentication,
  userController.getVisitCount
)

export default router