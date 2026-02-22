import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Turno from "../models/turno.js";
import Horario from "../models/horario.js";

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
    .withMessage("La fecha debe tener formato YYYY-MM-DD")
    .custom((fecha) => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const fechaTurno = new Date(fecha);

      if (fechaTurno < hoy) {
        throw new Error("No se puede asignar un turno en una fecha pasada");
      }

      return true;
    })
    .custom((fecha) => {
      const fechaTurno = new Date(fecha);
      const dia = fechaTurno.getDay(); // 0 domingo, 6 sábado

      if (dia === 5 || dia === 6) {
        throw new Error("La clínica no atiende fines de semana");
      }

      return true;
    })
    .custom((fecha) => {
      const fechaTurno = new Date(fecha);
      const hoy = new Date();

      const limite = new Date();
      limite.setDate(hoy.getDate() + 30);

      if (fechaTurno > limite) {
        throw new Error("No se pueden asignar turnos con más de 30 días de anticipación");
      }

      return true;
    }),

  body("hora")
    .notEmpty()
    .withMessage("La hora es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe tener formato HH:mm"),

  body("motivoConsulta")
    .notEmpty()
    .withMessage("El motivo de consulta es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("El motivo de consulta debe tener entre 3 y 150 caracteres"),

  body("estado")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isIn(["Pendiente", "Confirmado", "Cancelado", "Atendido", "Reprogramado"])
    .withMessage("Estado inválido"),

  // ejemplo de validación contra DB (opcional)
  body(["fecha", "hora", "medicoNombre"]).custom(async (_, { req }) => {

    const duracionMinutos = 30;

    const inicioNuevo = new Date(`${req.body.fecha}T${req.body.hora}`);
    const finNuevo = new Date(inicioNuevo.getTime() + duracionMinutos * 60000);

    const dia = new Date(fecha).getDay(); // 0 domingo, 6 sábado

    const horarios = await Horario.find({
      medicoNombre,
      diaSemana: dia,
    });

    if (!horarios.length) {
      throw new Error("El médico no atiende este día");
    }

    // 2️⃣ Verificar que esté dentro de algún rango laboral
    const dentroDeHorario = horarios.some((h) => {
      return hora >= h.horaInicio && hora < h.horaFin;
    });

    if (!dentroDeHorario) {
      throw new Error("El turno está fuera del horario laboral");
    }

    const turnos = await Turno.find({
      medicoNombre: req.body.medicoNombre,
      fecha: req.body.fecha,
    });

    for (const turno of turnos) {

      if (req.params?.id && turno._id.toString() === req.params.id) {
        continue;
      }

      const inicioExistente = new Date(`${turno.fecha}T${turno.hora}`);
      const finExistente = new Date(
        inicioExistente.getTime() + duracionMinutos * 60000
      );

      const haySuperposicion =
        inicioNuevo < finExistente &&
        finNuevo > inicioExistente;

      if (haySuperposicion) {
        throw new Error(
          `El médico ya tiene un turno de ${turno.hora} a ${new Date(finExistente).toTimeString().slice(0, 5)
          }`
        );
      }
    }

    return true;
  }),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionTurno;
