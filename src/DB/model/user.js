import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
name: String,

email: {
type: String,
unique: true,
required: true
},

password: {
type: String,
select: false
},

phone: String,

role: {
type: String,
enum: ["user","admin"],
default: "user"
},

isEmailConfirmed: {
type: Boolean,
default: false
},

otp: String,
otpExpires: Date,

refreshToken: String,

profileImage: String,

coverImages: [String],

gallery: [String],

visitCount: {
type: Number,
default: 0
}

},
{timestamps:true}
)

export default mongoose.model("User",userSchema)