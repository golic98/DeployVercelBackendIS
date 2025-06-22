import User from "../models/user.model.js";
import { TOKEN_SECRET } from "../token/token.js";
import jwt from "jsonwebtoken";
import {
  registerUser,
  authUser,
  getUserProfile,
  selectUsers,
  selectUsersNotFilter,
  dropUser,
  selectUserProfile,
  updateUserProfile,
  changePassword
} from "../services/user.services.js";


export const register = async (req, res) => {
  const { name, username, email, password, telephone, age, role } = req.body;

  try {
    const { user, token } = await registerUser({ name, username, email, password, telephone, age, role });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("Error: No se pudo registrar usuario.", error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await authUser(username, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });


  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  })
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);

    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createAt: user.createdAt,
      updateAt: user.updatedAt,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      name: userFound.name,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      telephone: userFound.telephone,
      age: userFound.age
    });
  });
}

export const getAllUsers = async (req, res) => {
  try {
    const user = await selectUsers();
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const getAllUser = async (req, res) => {
  try {
    const user = await selectUsersNotFilter();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    await dropUser(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
}

export const getOneProfile = async (req, res) => {
  try {
    const profile = await selectUserProfile(req.params.id);
    res.json(profile);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Error al obtener el perfil", error: error.message });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const updateProfile = await updateUserProfile(req.params.id, req.body, { new: true });
    return res.json(updateProfile);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await changePassword(username, password);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};