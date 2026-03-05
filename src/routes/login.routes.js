import express from "express";
import { login } from "../controllers/login.controllers.js";
import { forgotPassword, resetPassword } from "../controllers/resetPassword.js";

const router = express.Router();

router.post("/login", login);
router.post("/recuperar-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;