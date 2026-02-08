import {Router} from "express"
import { crearTurno, obtenerTurnos, obtenerTurno, borrarTurno, editarTurno } from "../controllers/turnos.controllers.js"

const router = Router()

router.route("/").post(crearTurno).get(obtenerTurnos)

router.route('/:id').get(obtenerTurno).delete(borrarTurno).put(editarTurno)

export default router