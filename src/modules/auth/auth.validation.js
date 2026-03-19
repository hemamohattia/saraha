import Joi from "joi";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const nameRegex = /^[A-Z][a-z]{1,19}\s{1}[A-Z][a-z]{1,19}$/;
const phoneRegex = /^(002|\+2)?01[0125][0-9]{8}$/;

export const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  phone: Joi.string().pattern(phoneRegex).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const confirmEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
  newPassword: Joi.string().pattern(passwordRegex).required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
});