import User from "../model/user.js";

export const createUser = (data) => User.create(data);

export const findUserByEmail = (email) => User.findOne({ email }).select("+password");

export const findUserById = (id) => User.findById(id);