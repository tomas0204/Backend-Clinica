import express from "express";
import {
  crearPagoTurno,
  recibirWebhook,
} from "../controllers/pagos.controllers.js";

const router = express.Router();

// Crear pago del turno
router.post("/crear", crearPagoTurno);

// Webhook Mercado Pago
router.post("/webhook", recibirWebhook);

export default router;
