import { Router } from "express"
import { crearGuardia, editarGuardiaPorID, eliminarGuardiaPorID, listarGuardia, obtenerGuardiaPorID, pruebaGuardia } from "../controllers/guardia.controllers.js"
import validacionGuardia from "../middlewares/validacionGuardia.js"
import validarToken from "../middlewares/validacionAuth.js"

const router = Router()

router.route("/testguardia").get(pruebaGuardia)

router.route("/").post([validarToken ,validacionGuardia] , crearGuardia).get(listarGuardia)

router.route("/:id").get(obtenerGuardiaPorID).delete([validarToken, validacionGuardia], eliminarGuardiaPorID).put([validarToken ,validacionGuardia], editarGuardiaPorID)

export default router