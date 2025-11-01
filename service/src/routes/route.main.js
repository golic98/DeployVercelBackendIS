import { Router } from "express";
import { addPayVigilance, getAllPay } from "../controllers/pay.controllers.js";
import { authRequired } from "../middlewares/validate.token.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../schema/auth.schema.js";
import { register, login, logout, profile, verifyToken, getAllUsers, deleteOneUser, getOneProfile, updateProfile, getAllUser, createUserByAdmin, updatePassword } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);
router.get("/users", authRequired, getAllUsers);
router.get("/allUser", authRequired, getAllUser);
router.delete("/users/:id", authRequired, deleteOneUser);
router.get("/profile/:id", authRequired, getOneProfile);
router.put("/profile/:id", authRequired, updateProfile);
router.post("/payVigilance", authRequired, addPayVigilance);
router.get("/allPay", authRequired, getAllPay);

router.post("/createUser", validateSchema(registerSchema), authRequired, createUserByAdmin);
router.put("/updatePassword", updatePassword);

export default router;
