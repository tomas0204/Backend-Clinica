import { Router } from "express";
import { crearPaciente, listarProductos, prueba } from "../controllers/pacientes.controllers.js";


const router = Router();

router.route('/test').get(prueba);

router.route('/').post(crearPaciente).get(listarProductos);

export default router;
