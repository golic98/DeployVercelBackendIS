import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

export const createUserByAdmin = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

export const findByUsername = async (username) => {
    return await User.findOne({ username });
};

export const validatePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

export const getAllUserFromDB = async () => {
    return await User.find();
};

export const getAllUserNotFilter = async () => {
    return await User.find();
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export const getUserById = async(id) => {
    return await User.findById(id);
};

export const updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const updatePasswordByUsername = async (username, newHashedPassword) => {
    return await User.findOneAndUpdate(
        { username },
        { password: newHashedPassword },
        { new: true }
    );
};
