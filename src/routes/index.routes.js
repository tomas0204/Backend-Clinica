import {Router} from "express"
import turnosRoutes from "./turnos.routes.js"
import pagosRoutes from "./pago.routes.js";
import pacientesRoutes from "./pacientes.routes.js";
import loginRoutes from "./login.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router()

router.use("/turnos", turnosRoutes)
router.use("/pagos", pagosRoutes);
router.use("/pacientes", pacientesRoutes);
router.use("/auth", loginRoutes);
router.use("/admin", adminRoutes);

export default router