import { Router } from "express";
import { crearPaciente, listarPacientes, obtenerPaciente, prueba } from "../controllers/pacientes.controllers.js";


const router = Router();

router.route('/test').get(prueba);

router.route('/').post(crearPaciente).get(listarPacientes);

router.route('/:id').get(obtenerPaciente);

export default router;
