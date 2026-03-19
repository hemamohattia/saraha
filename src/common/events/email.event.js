import EventEmitter from "events";
import nodemailer from "nodemailer";
import { verifyEmailTemplate } from "../utils/emailTemplate.js";

export const emailEvent = new EventEmitter();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

emailEvent.on("sendEmail", async ({ to, otp, title = "Confirm your email" }) => {
  try {
    await transporter.sendMail({
      from: `"App" <${process.env.EMAIL_USER}>`,
      to,
      subject: title,
      html: verifyEmailTemplate(otp, title),
    });
  } catch (err) {
    console.error("Email sending error:", err.message);
  }
});