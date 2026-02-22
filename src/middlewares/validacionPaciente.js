import { body, validationResult } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Paciente from "../models/paciente.js";

const validacionPaciente = [

    // 🧑 Nombre y Apellido
    body("nombre_y_apellido")
        .notEmpty()
        .withMessage("Nombre y Apellido son datos obligatorios")
        .isLength({ min: 5, max: 40 })
        .withMessage("Debe tener entre 5 y 40 caracteres")
        .custom(async (valor, { req }) => {
            const productoExistente = await Paciente.findOne({
                nombre_y_apellido: valor,
            })
            if (!productoExistente) {
               return true; 
            }
            if(
                req.params?.id &&   productoExistente.id_.toString() === req.params.id
            ){
                return true;
            }

            //enviar mensaje de error 
            throw new Error("El nombre y Apellido ya esta registrado")
    }),


    // 📱 Celular
    body("celular")
        .notEmpty()
        .withMessage("El celular es obligatorio")
        .isLength({ min: 9 })
        .withMessage("Debe tener al menos 9 dígitos")
        .matches(/^[0-9]+$/)
        .withMessage("Solo se permiten números"),

    // 📧 Email
    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
        .withMessage("El email no es válido")
        .custom(async (value) => {
            const existeEmail = await Paciente.findOne({ email: value });
            if (existeEmail) {
                throw new Error("El email ya está registrado");
            }
        }),

    // 🏥 Obra Social
    body("obraSocial")
        .notEmpty()
        .withMessage("Debe seleccionar una obra social")
        .isIn(["Prensa", "Red de Seguro Medico", "Pami", "Osecac", "Particular"])
        .withMessage("Obra social no válida"),

    // 🔐 Contraseña
    body("contraseña")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,12}$/)
        .withMessage("Debe tener entre 6 y 12 caracteres, una mayúscula, una minúscula, un número y un carácter especial"),

    // 📦 Resultado final
    (req, res, next) => resultadoValidacion(req, res, next)
];

export default validacionPaciente;