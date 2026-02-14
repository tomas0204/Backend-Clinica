import { Router } from "express";
import {  borrarPacientePorID, crearPaciente, listarPacientes, obtenerPaciente, prueba } from "../controllers/pacientes.controllers.js";


const router = Router();

router.route('/test').get(prueba);

router.route('/').post(crearPaciente).get(listarPacientes);

router.route('/:id').get(obtenerPaciente).delete(borrarPacientePorID)

export default router;
