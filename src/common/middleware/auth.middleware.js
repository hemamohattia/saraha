import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config.service.js";

export const authentication = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};