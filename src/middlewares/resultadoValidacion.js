import { validationResult } from "express-validator"

const resultadoValidacion = (req, res, next) => {
    const errores = validationResult(req)
    //ocurrieron errores en la validacion
    if (!errores.isEmpty()) {
        //enviamos msj de error 400(bad request) porque falto una parte del body(producto incompleto)
        //array de errores
        return res.status(400).json(errores.array())
    }
    //continua con la siguiente ejecucion
    next()
}

export default resultadoValidacion;