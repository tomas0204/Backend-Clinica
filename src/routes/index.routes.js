import {Router} from "express"
import turnosRoutes from "./turnos.routes.js"

const router = Router()

router.use("/turnos", turnosRoutes)

export default router