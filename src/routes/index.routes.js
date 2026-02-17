import {Router} from "express"
import turnosRoutes from "./turnos.routes.js"
import pagosRoutes from "./pago.routes.js";

const router = Router()

router.use("/turnos", turnosRoutes)
router.use("/pagos", pagosRoutes);

export default router