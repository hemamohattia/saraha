import { verifyAccessToken } from "../security/token.js";

export const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });
    if (!authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Authorization header must start with Bearer" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "JWT token not provided" });

    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};