import { Preference, Payment } from "mercadopago";
import client from "../server/mercadopago.js";
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

    const nuevoTurno = await Turno.create({
      pacienteNombre,
      medicoNombre,
      fecha,
      hora,
      motivoConsulta,
      precio,
      estado: "Pendiente",     
      estadoPago: "Pendiente"   
    });

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
        success: "https://clinica-eight-beryl.vercel.app/turnos",
        failure: "https://clinica-eight-beryl.vercel.app/*"
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
  try {
    const type = req.body.type || req.query.type;
    const paymentId = req.body.data?.id || req.query["data.id"];

    if (type === "payment" && paymentId) {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: paymentId });

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
    console.error(error);
    res.sendStatus(500);
  }
};
