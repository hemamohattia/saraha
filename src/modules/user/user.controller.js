import * as userService from "./user.service.js"
import { successResponse } from "../../common/utils/response/index.js"

export const getProfile = async(req,res,next)=>{

try{

const data = await userService.getProfileService(req.user.id)

return successResponse(res,{data})

}catch(error){
next(error)
}

}

export const updateAccount = async(req,res,next)=>{

try{

const data = await userService.updateAccountService(req.user.id,req.body)

return successResponse(res,{
message:"Account updated successfully",
data
})

}catch(error){
next(error)
}

}

export const uploadProfileImage = async(req,res,next)=>{

try{

const data = await userService.uploadProfileImageService(req.user.id,req.file)

return successResponse(res,{
message:"Profile image uploaded",
data
})

}catch(error){
next(error)
}

}

export const removeProfileImage = async(req,res,next)=>{

try{

await userService.removeProfileImageService(req.user.id)

return successResponse(res,{
message:"Profile image removed"
})

}catch(error){
next(error)
}

}

export const uploadCoverImages = async (req, res, next) => {
    try {
        const data = await userService.uploadCoverImagesService(req.user.id, req.files)

        return successResponse(res, {
            message: "Cover images uploaded",
            data
        })
    } catch (error) {
        next(error)
    }
}

export const getVisitCount = async(req,res,next)=>{

try{

const data = await userService.getVisitCountService(req.user.id)

return successResponse(res,{data})

}catch(error){
next(error)
}

}