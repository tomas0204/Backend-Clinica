import express from "express";
import {
  crearHistorial,
  obtenerHistorialPorPaciente,
  obtenerHistorialPorId,
  actualizarHistorial,
  eliminarHistorial
} from "../controllers/Historial.controller.js";

const router = express.Router();

// Crear historial
router.post("/", crearHistorial);

// Obtener historial por ID
router.get("/id/:id", obtenerHistorialPorId);

// Obtener historial por paciente
router.get("/paciente/:pacienteId", obtenerHistorialPorPaciente);

// Actualizar historial
router.put("/:id", actualizarHistorial);

// Eliminar historial
router.delete("/:id", eliminarHistorial);

export default router;
