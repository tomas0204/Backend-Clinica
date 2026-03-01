import {Router} from "express"
import { crearTurno, obtenerTurnos, obtenerTurno, 
    borrarTurno, editarTurno, turnosPaginados, 
    cancelarTurno } from "../controllers/turnos.controllers.js"
import validacionTurno from "../middlewares/validacionTurno.js"
import validacionIdTurno from "../middlewares/validacionTurnoId.js"
import validarToken from "../middlewares/validacionAuth.js"
import validarRol from "../middlewares/validarRol.js"


const router = Router()

router.route("/").post(validacionTurno, crearTurno).get(obtenerTurnos)

router.route('/paginacion').get(turnosPaginados)


router.route('/:id')
  .get(validacionIdTurno, obtenerTurno)
  .delete(validacionIdTurno, validarToken, validarRol("admin"), borrarTurno)
  .put([validacionIdTurno, validacionTurno], validarToken, validarRol("admin"), editarTurno)

router.route('/:id/cancelar')
    .patch(validacionIdTurno, validarToken, cancelarTurno)


export default router