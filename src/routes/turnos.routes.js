import {Router} from "express"
import { crearTurno, obtenerTurnos } from "../controllers/turnos.controllers.js"

const router = Router()

router.route("/").post(crearTurno).get(obtenerTurnos)

export default router