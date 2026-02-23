import { Router } from "express";
import {  
    borrarPacientePorID, 
    crearPaciente, 
    editarPacientePorID, 
    listarPacientes, 
    obtenerPaciente, 
    prueba 
} from "../controllers/pacientes.controllers.js";

import validacionPaciente from "../middlewares/validacionPaciente.js";
import validacionIdPaciente from "../middlewares/validacionidPaciente.js";
import validarToken from "../middlewares/validacionAuth.js";  
import validarRol from "../middlewares/validarRol.js";

const router = Router();

router.route('/test').get(prueba);

// Crear y listar
router.route('/')
    .post(validacionPaciente, crearPaciente)
    .get(listarPacientes);

// Operaciones por ID
router.route('/:id')
    .get(validarToken, validarRol("admin"), validacionIdPaciente, obtenerPaciente)
    .delete(validarToken, validarRol("admin"), validacionIdPaciente, borrarPacientePorID)
    .put(
        validarToken,
        validarRol("admin"),
        validacionIdPaciente,
        validacionPaciente,
        editarPacientePorID
    );

export default router;
