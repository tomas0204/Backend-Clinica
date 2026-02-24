import { Router } from "express"
import { crearGuardia, editarGuardiaPorID, eliminarGuardiaPorID, listarGuardia, obtenerGuardiaPorID, pruebaGuardia } from "../controllers/guardia.controllers.js"
import validacionGuardia from "../middlewares/validacionGuardia.js"

const router = Router()

router.route("/testguardia").get(pruebaGuardia)
router.route("/").post(validacionGuardia , crearGuardia).get(listarGuardia)
router.route("/:id").get(obtenerGuardiaPorID).delete(eliminarGuardiaPorID).put(editarGuardiaPorID)

export default router