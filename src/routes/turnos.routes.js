import {Router} from "express"
import { crearTurno, obtenerTurnos, obtenerTurno } from "../controllers/turnos.controllers.js"

const router = Router()

router.route("/").post(crearTurno).get(obtenerTurnos)

router.route('/:id').get(obtenerTurno)

export default router