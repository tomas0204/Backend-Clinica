import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionIdGuardia =[
    param("id")
    .isMongoId()
    .withMessage("El ID no cumple con el formato que genera mongoDB"),
    (req, res, next) => resultadoValidacion(req, res, next)

]

export default validacionIdGuardia