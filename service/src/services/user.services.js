import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import {
    createUser,
    findByUsername,
    validatePassword,
    findUserById,
    getAllUserFromDB,
    getAllUserNotFilter,
    deleteUser,
    getUserById,
    updateUserById,
    updatePasswordByUsername
} from "../repository/user.repository.js";


export const registerUser = async (userData) => {
    const { username, password } = userData;

    const userFound = await User.findOne({ username });

    if (userFound) {
        throw new Error("El usuario ya existe");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userSave = await createUser({ ...userData, password: passwordHash });
    const token = await createAccessToken({ id: userSave._id });

    return {
        user: {
            id: userSave._id,
            name: userSave.name,
            username: userSave.username,
            email: userSave.email,
            age: userSave.age,
            role: userSave.role,
            createAt: userSave.createdAt,
            updateAt: userSave.updatedAt
        },
        token
    };
};

export const authUser = async (username, password) => {
    const user = await findByUsername(username);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const passwordValid = await validatePassword(password, user.password);

    if (!passwordValid) {
        throw new Error("Datos incorrectos");
    }

    const token = await createAccessToken({ id: user._id });

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            age: user.age,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    };
    
};

export const getUserProfile = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user;
};

export const selectUsers = async () => {
    try {
        const users = await getAllUserFromDB();

        if (users.length === 0) {
            throw new Error("No se encontraron usuarios");
        }

        const filterUser = users.filter(user => user.role !== "admin");

        return filterUser.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
    } catch (error) {
        throw new Error(error.message || "Error en el servicio de usuarios");
    }
};

export const selectUsersNotFilter = async () => {
    try {
        const users = await getAllUserNotFilter();

        if (users.length === 0) {
            throw new Error("No se encontraron usuarios");
        }

        return users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
    } catch (error) {
        throw new Error(error.message || "Error en el servicio de usuarios");
    }
};

export const dropUser = async (id) => {
    const user = await deleteUser(id);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    return user;
};

export const selectUserProfile = async (id) => {
    const profile = await getUserById(id);

    if (!profile) {
        throw new Error("Usuario no encontrado");
    }
    return profile;
};

export const updateUserProfile = async (id, updateData) => {
    const updateProfile = await updateUserById(id, updateData);

    if (!updateProfile) {
        throw new Error("Usuario no encontrado");
    }
    return updateProfile;
};

export const changePassword = async (username, newPassword) => {
    const user = await findByUsername(username);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await updatePasswordByUsername(username, hashedPassword);

    return {
        message: "Contraseña actualizada correctamente",
        updatedAt: updatedUser.updatedAt
    };
};

export const registerUserByAdmin = async (userData) => {
    const { username, password } = userData;

    const userFound = await User.findOne({ username });

    if (userFound) {
        throw new Error("El usuario ya existe");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userSave = await createUser({ ...userData, password: passwordHash });
    const token = await createAccessToken({ id: userSave._id });

    return {
        user: {
            id: userSave._id,
            name: userSave.name,
            username: userSave.username,
            email: userSave.email,
            age: userSave.age,
            role: userSave.role,
            createAt: userSave.createdAt,
            updateAt: userSave.updatedAt
        },
        token
    };
};