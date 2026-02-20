import { Router } from "express";
import {  borrarPacientePorID, 
    crearPaciente, 
    editarPacientePorID, 
    listarPacientes, 
    obtenerPaciente, 
    prueba } from "../controllers/pacientes.controllers.js";
import validarToken from "../middlewares/validacionAuth.js";  
import validarRol from "../middlewares/validarRol.js";

const router = Router();

router.route('/test').get(prueba);

router.route('/').post(crearPaciente).get(validarToken, validarRol("admin"), listarPacientes);

router.route('/:id').get(validarToken, validarRol("admin"), obtenerPaciente).delete(validarToken, validarRol("admin"), borrarPacientePorID).put(validarToken, validarRol("paciente"),validarRol("admin"), editarPacientePorID)

export default router;
