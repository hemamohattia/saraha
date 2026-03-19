import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PORT, NODE_ENV } from "../config/config.service.js";
import { authRouter, userRouter, messageRouter } from "./modules/index.js";
import { globalErrorHandling } from "./common/utils/response/index.js";

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FE_URL || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json());
app.use("/uploads", express.static(path.resolve("src/uploads")));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use(globalErrorHandling);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;