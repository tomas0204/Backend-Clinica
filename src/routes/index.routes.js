import Router from "./doctores.routes";
import doctoresRoutes from "./doctores.routes.js"


const router = Router();
router.use('/doctores', doctoresRoutes);

export default router;