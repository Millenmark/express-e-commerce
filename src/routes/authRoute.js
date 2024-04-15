import { Router } from "express";
/** IMPORT: CONTROLLER */
import { register, login, logout } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
