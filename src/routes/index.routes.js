<<<<<<< HEAD
import {Router} from "express"
import turnosRoutes from "./turnos.routes.js"
import pagosRoutes from "./pago.routes.js";
import pacientesRoutes from "./pacientes.routes.js";

const router = Router()

router.use("/turnos", turnosRoutes)
router.use("/pagos", pagosRoutes);
router.use("/pacientes", pacientesRoutes);

export default router