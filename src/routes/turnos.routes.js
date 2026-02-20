import {Router} from "express"
import { crearTurno, obtenerTurnos, obtenerTurno, borrarTurno, editarTurno, turnosPaginados } from "../controllers/turnos.controllers.js"
import validacionTurno from "../middlewares/validacionTurno.js"
import validacionIdTurno from "../middlewares/validacionTurnoId.js"
import validarRol from "../middlewares/validarRol.js"
import validarToken from "../middlewares/validarToken.js"

const router = Router()

router.route("/").post(validacionTurno, crearTurno).get(obtenerTurnos)

router.route('/paginacion').get(turnosPaginados)

router.route('/:id').get(validacionIdTurno, obtenerTurno).delete(validacionIdTurno, borrarTurno).put([validacionIdTurno, validacionTurno],editarTurno)

export default router