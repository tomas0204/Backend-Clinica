import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Paciente from "../models/paciente.js";

const validacionPaciente = [
  body("nombre_y_apellido")
    .notEmpty()
    .withMessage("Nombre y Apellido son datos obligatorios")
    .isLength({ min: 5, max: 40 })
    .withMessage("Nombre y Apellido debe tener entre 5 y 40 caracteres"),
  body("celular")
    .notEmpty()
    .withMessage("El celular es obligatorio")
    .isLength({ min: 9 })
    .withMessage("Debe tener al menos 9 dígitos")
    .matches(/^[0-9]+$/)
    .withMessage("Solo se permiten números"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("El email no es válido")
    .custom(async (value, { req }) => {
      const existeEmail = await Paciente.findOne({ email: value });
      if (existeEmail) {
        if (req.params?.id && existeEmail._id.toString() === req.params.id) return true;
        throw new Error("El email ya está registrado");
      }
    }),
  body("obraSocial")
    .notEmpty()
    .withMessage("Debe seleccionar una obra social")
    .isIn(["Prensa", "Red de Seguro Medico", "Pami", "Osecac", "Particular"])
    .withMessage("Obra social no válida"),
  body("contraseña")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,12}$/)
    .withMessage("Debe tener entre 6 y 12 caracteres, una mayúscula, una minúscula, un número y un carácter especial"),
  (req, res, next) => resultadoValidacion(req, res, next)
];

export default validacionPaciente;