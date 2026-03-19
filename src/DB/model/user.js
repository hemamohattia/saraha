import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false },
    phone: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isEmailConfirmed: { type: Boolean, default: false },
    isFrozen: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    refreshToken: { type: String, select: false },
    profileImage: String,
    coverImages: [String],
    gallery: [String],
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);