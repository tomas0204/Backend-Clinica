import express from "express";
import { crearUsuarioAdmin } from "../controllers/admin.controllers.js";
import validarToken from "../middlewares/validacionAuth.js";
import validarRol from "../middlewares/validarRol.js";

const router = express.Router();

// Crear usuario admin
router.post("/", validarToken, validarRol("admin"), crearUsuarioAdmin);

export default router;