import { Router } from "express";
import { prueba, crearDoctor } from "../controllers/doctores.controllers.js";

const router = Router();
router.get("/", prueba);
router.route('/').post(crearDoctor);


export default router; // 👈 ESTO ES CLAVE
