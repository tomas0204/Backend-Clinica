import { Router } from "express";
import {  crearDoctor, listarDoctores, obtenerDoctor } from "../controllers/doctores.controllers.js";

const router = Router();

router.route('/').post(crearDoctor).get(listarDoctores);
router.route('/:id').get(obtenerDoctor);


export default router; // 👈 ESTO ES CLAVE
