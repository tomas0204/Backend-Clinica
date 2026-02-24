import { body } from "express-validator";
import Guardia from "../models/guardia.js";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionGuardia = [
    body("nombreGuardia")

    .trim()
    .notEmpty()
    .withMessage("El campo de nombre no puede enviarse vacio")
    .isLength({ min: 5 , max: 30})
    .withMessage("El nombre debe tener al menos 5 caracteres como minimo y 30 como maximo")
    .custom(async(valor ) => {

        const existente = await Guardia.countDocuments({
            nombreGuardia: valor
        })
        if (existente < 2) {
            return true;
        }

        throw new Error("Ya existen al menos 2 guardias asignadas a ese Dr.")
        
    } ),
    body("entradaGuardia")
    
    .notEmpty()
    .withMessage("El campo de horario de entrada no puede quedar vacio")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    
    body("salidaGuardia")
    .notEmpty()
    .withMessage("El campo de horario de entrada no puede quedar vacio")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/), 

    (req, res, next) => resultadoValidacion(req, res, next)
];

export default validacionGuardia