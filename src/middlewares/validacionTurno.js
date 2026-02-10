import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Turno from "../models/turno.js";

const validacionTurno = [
  body("pacienteNombre")
    .notEmpty()
    .withMessage("El nombre del paciente es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre del paciente debe tener entre 3 y 100 caracteres"),

  body("medicoNombre")
    .notEmpty()
    .withMessage("El nombre del médico es obligatorio"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener formato YYYY-MM-DD"),

  body("hora")
    .notEmpty()
    .withMessage("La hora es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe tener formato HH:mm"),

  body("estado")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isIn(["Pendiente", "Confirmado", "Cancelado", "Atendido", "Reprogramado"])
    .withMessage("Estado inválido"),

  // ejemplo de validación contra DB (opcional)
  body(["fecha", "hora", "medicoNombre"]).custom(async (_, { req }) => {
    const turnoExistente = await Turno.findOne({
      fecha: req.body.fecha,
      hora: req.body.hora,
      medicoNombre: req.body.medicoNombre,
    });

    if (!turnoExistente) return true;

    if (
      req.params?.id &&
      turnoExistente._id.toString() === req.params.id
    ) {
      return true;
    }

    throw new Error("El médico ya tiene un turno en ese horario");
  }),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionTurno;
