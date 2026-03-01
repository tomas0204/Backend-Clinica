import { Router } from "express";
import { crearDoctor, listarDoctores, obtenerDoctor, borrarDoctorPorID, editarDoctorPorID } from "../controllers/doctores.controllers.js";

const router = Router();

router.route('/').post(crearDoctor).get(listarDoctores);
router.route('/:id').get(obtenerDoctor).delete(borrarDoctorPorID).put(editarDoctorPorID);


export default router; 
