import { Router } from "express"
import { crearGuardia, listarGuardia, obtenerGuardiaPorID, pruebaGuardia } from "../controllers/guardia.controllers.js"

const router = Router()

router.route("/testguardia").get(pruebaGuardia)
router.route("/").post(crearGuardia).get(listarGuardia)
router.route("/:id").get(obtenerGuardiaPorID)

export default router