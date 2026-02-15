import { Preference } from "mercadopago";
import client from "../server/mercadopago.js";
import Turno from "../models/turno.js";

export const crearPagoTurno = async (req, res) => {
  try {
    const { medicoId, fecha, hora, pacienteId } = req.body;

    // 1️⃣ Crear turno pendiente
    const nuevoTurno = await Turno.create({
      medicoId,
      fecha,
      hora,
      pacienteId,
      precio: 5000,
      estado: "pendiente_pago",
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
        success: `${process.env.DB}/pago/exitoso`,
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
  }
};

export const recibirWebhook = async (req, res) => {
  const notification = req.body;

  try {
    if (notification.type === "payment") {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: notification.data.id });

      if (payment.status === "approved") {

        const turnoId = payment.external_reference;
        const turno = await Turno.findById(turnoId);

        if (!turno) return res.sendStatus(404);

        if (turno.estado === "pendiente_pago") {
          turno.estado = "pagado";
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
