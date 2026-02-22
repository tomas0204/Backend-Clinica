import { Router } from "express";
import { borrarPacientePorID, crearPaciente, editarPacientePorID, listarPacientes, obtenerPaciente, prueba } from "../controllers/pacientes.controllers.js";
import validacionPaciente from "../middlewares/validacionPaciente.js";
import validacionIdPaciente from "../middlewares/validacionidPaciente.js";

const router = Router();

router.route('/test').get(prueba);

router.route('/').post(validacionPaciente, crearPaciente).get(listarPacientes);

router.route('/:id').get(validacionIdPaciente, obtenerPaciente).delete(validacionIdPaciente, borrarPacientePorID).put([validacionIdPaciente, validacionPaciente], editarPacientePorID)

export default router;
