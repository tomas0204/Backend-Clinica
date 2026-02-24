import { Router } from "express"
import { crearGuardia, eliminarGuardiaPorID, listarGuardia, obtenerGuardiaPorID, pruebaGuardia } from "../controllers/guardia.controllers.js"

const router = Router()

router.route("/testguardia").get(pruebaGuardia)
router.route("/").post(crearGuardia).get(listarGuardia)
router.route("/:id").get(obtenerGuardiaPorID).delete(eliminarGuardiaPorID)

export default router