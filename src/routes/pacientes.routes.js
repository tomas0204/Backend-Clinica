import { Router } from "express";
import { prueba } from "../controllers/pacientes.controllers.js"; 

const router = Router();

// petición y respuesta (req, res)
router.route("/").get(prueba);

export default router;
