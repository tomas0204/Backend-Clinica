import { Router } from "express";
import { crearPaciente, prueba } from "../controllers/pacientes.controllers.js";


const router = Router();

router.route('/test').get(prueba);

router.route('/').post(crearPaciente);

export default router;
