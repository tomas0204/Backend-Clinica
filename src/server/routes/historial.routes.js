import { Router } from "express";
import { crearHistorial, obtenerHistorialPorPaciente } from "../controllers/historial.controller.js";

const router = Router();

router.post("/", crearHistorial);
router.get("/:pacienteId", obtenerHistorialPorPaciente);

export default router;
