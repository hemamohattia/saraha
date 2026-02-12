import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../../DB/repository/user.repository.js";
import { hashPassword, comparePassword } from "../../common/security/hash.js";
import { encrypt } from "../../common/security/encryption.js";
import { JWT_SECRET } from "../../../config/config.service.js";

export const registerService = async (body) => {
    const email = body.email.toLowerCase().trim();
    const exist = await findUserByEmail(email);
    if (exist) throw new Error("Email already exists");

    if (body.password !== body.confirmPassword) {
        throw new Error("Passwords do not match");
    }

    body.email = email;
    body.password = await hashPassword(body.password);

    if (body.phone) {
        body.phone = encrypt(body.phone);
    }

    return await createUser(body);
};

export const loginService = async ({ email, password }) => {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await findUserByEmail(normalizedEmail);
    
    if (!user) throw new Error("Invalid email or password");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    return jwt.sign({ id: user._id }, JWT_SECRET);
};