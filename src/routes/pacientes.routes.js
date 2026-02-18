import { Router } from "express";
import {  borrarPacientePorID, 
    crearPaciente, 
    editarPacientePorID, 
    listarPacientes, 
    obtenerPaciente, 
    prueba } from "../controllers/pacientes.controllers.js";
import validarToken from "../middlewares/validacionAuth.js";  

const router = Router();

router.route('/test').get(prueba);

router.route('/').post(crearPaciente).get(validarToken, listarPacientes);

router.route('/:id').get(obtenerPaciente).delete(borrarPacientePorID).put(editarPacientePorID)

export default router;
