import express from "express";
import { loginPaciente } from "../controllers/login.controllers.js";

const router = express.Router();

// Login de paciente
router.post("/login", loginPaciente);

export default router;