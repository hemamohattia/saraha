import fs from "fs"
import User from "../../DB/model/user.js"

export const getProfileService = async(id)=>{

const user = await User.findById(id).select("-password -refreshToken")

if(!user) throw new Error("User not found")

user.visitCount += 1
await user.save()

return user

}

export const updateAccountService = async(id,data)=>{

const user = await User.findByIdAndUpdate(id,data,{new:true})

if(!user) throw new Error("User not found")

return user

}

export const uploadProfileImageService = async(id,file)=>{

const user = await User.findById(id)

if(!user) throw new Error("User not found")

if(user.profileImage){
user.gallery.push(user.profileImage)
}

user.profileImage = file.path

await user.save()

return user

}

export const removeProfileImageService = async(id)=>{

const user = await User.findById(id)

if(!user) throw new Error("User not found")

if(!user.profileImage) throw new Error("No profile image")

fs.unlinkSync(user.profileImage)

user.profileImage=null

await user.save()

return true

}

export const uploadCoverImagesService = async (id, files) => {
    const user = await User.findById(id)

    if (!user) throw new Error("User not found")

    const paths = files.map(file => file.path)

    user.coverImages.push(...paths)

    await user.save()

    return user
}

export const getVisitCountService = async(id)=>{

const user = await User.findById(id)

if(!user) throw new Error("User not found")

return user.visitCount

}