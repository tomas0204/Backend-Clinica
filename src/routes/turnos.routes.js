import {Router} from "express"
import { crearTurno, obtenerTurnos, obtenerTurno, borrarTurno } from "../controllers/turnos.controllers.js"

const router = Router()

router.route("/").post(crearTurno).get(obtenerTurnos)

router.route('/:id').get(obtenerTurno).delete(borrarTurno)

export default router