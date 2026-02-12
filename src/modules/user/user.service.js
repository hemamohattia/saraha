import { findUserById } from "../../DB/repository/user.repository.js";

export const getProfileService = async (id) => {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");
    return user;
};

export const updateAccountService = async (id, body) => {
    const user = await findUserById(id);
    if (!user) throw new Error("User not found");
    
    Object.assign(user, body);
    return await user.save();
};