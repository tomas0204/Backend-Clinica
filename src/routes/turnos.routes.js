import {Router} from "express"
import { crearTurno, obtenerTurnos, obtenerTurno, borrarTurno, editarTurno } from "../controllers/turnos.controllers.js"
import validacionTurno from "../middlewares/validacionTurno.js"
import validacionIdTurno from "../middlewares/validacionTurnoId.js"

const router = Router()

router.route("/").post(validacionTurno, crearTurno).get(obtenerTurnos)

router.route('/:id').get(validacionIdTurno, obtenerTurno).delete(validacionIdTurno, borrarTurno).put([validacionIdTurno, validacionTurno],editarTurno)

export default router