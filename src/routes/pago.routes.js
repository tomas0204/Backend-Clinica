import express from "express";
import {
  crearPagoTurno,
  recibirWebhook,
} from "../controllers/pagos.controllers.js";
import validacionIdTurno from "../middlewares/validacionTurnoId.js";
import validacionTurno from "../middlewares/validacionTurno.js";

const router = express.Router();

router.post("/crear", validacionTurno, crearPagoTurno);

router.post("/webhook", recibirWebhook);

export default router;
