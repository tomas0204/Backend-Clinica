import { Preference, Payment } from "mercadopago";
import client from "../config/mercadopago.js";
import Turno from "../models/turno.js";

export const crearPagoTurno = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      pacienteNombre,
      medicoNombre,
      fecha,
      hora,
      motivoConsulta,
      precio
    } = req.body;

    // 1️⃣ Crear turno pendiente
    const nuevoTurno = await Turno.create({
      pacienteNombre,
      medicoNombre,
      fecha,
      hora,
      motivoConsulta,
      precio,
      estado: "Pendiente",      // estado médico
      estadoPago: "Pendiente"   // estado de pago
    });

    // 2️⃣ Crear preferencia
    const preference = {
      items: [
        {
          title: "Turno médico",
          quantity: 1,
          currency_id: "ARS",
          unit_price: nuevoTurno.precio,
        },
      ],
      back_urls: {
        success: "http://localhost:5173/turnos",
        failure: "http://localhost:5173/error404"
      },
      external_reference: nuevoTurno._id.toString(),
    };

    const preferenceClient = new Preference(client);
    const respuesta = await preferenceClient.create({ body: preference });

    res.status(201).json({
      init_point: respuesta.init_point,
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear pago del turno" });
    console.error(error.message);

  }
};

export const recibirWebhook = async (req, res) => {
  const notification = req.body;
  console.log("Webhook recibido:", req.body);

  try {
    if (notification.type === "payment") {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: notification.data.id });

      if (payment.status === "approved") {

        const turnoId = payment.external_reference;
        const turno = await Turno.findById(turnoId);

        if (!turno) return res.sendStatus(404);

        if (turno.estadoPago === "Pendiente") {
          turno.estadoPago = "Pagado";
          turno.paymentId = payment.id;
          await turno.save();
        }
      }
    }

    res.sendStatus(200);

  } catch (error) {
    res.status(500).json({ mensaje: "Error webhook" });
  }
};
