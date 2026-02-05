import {Router} from "express"
import { crearTurno } from "../controllers/turnos.controllers.js"

const router = Router()

router.route("/").post(crearTurno)

export default router