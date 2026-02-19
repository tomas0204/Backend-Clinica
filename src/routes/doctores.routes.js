import { Router } from "express";
import { crearDoctor, listarDoctores, obtenerDoctor, borrarDoctorPorID } from "../controllers/doctores.controllers.js";

const router = Router();

router.route('/').post(crearDoctor).get(listarDoctores);
router.route('/:id').get(obtenerDoctor).delete(borrarDoctorPorID);


export default router; 
