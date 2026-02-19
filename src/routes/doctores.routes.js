import { Router } from "express";
import { prueba } from "../controllers/doctores.controllers.js";

const router = Router();
router.route('/test').get(prueba);

export default router; // 👈 ESTO ES CLAVE
