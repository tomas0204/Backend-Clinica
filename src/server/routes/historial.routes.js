import express from "express";
import { crearHistorial, obtenerHistorialPorPaciente } from "../controllers/historial.controller.js";


const router = express.Router();

// Crear historial
router.post("/", crearHistorial);

// Obtener historial por paciente
router.get("/:pacienteId", obtenerHistorialPorPaciente);

export default router;
