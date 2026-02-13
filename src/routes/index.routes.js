import { Router } from "express";
import pacientesRoutes from "./pacientes.routes.js";


const router = Router();


router.use('/pacientes', pacientesRoutes);

export default router;
