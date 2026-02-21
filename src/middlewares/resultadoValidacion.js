import { validationResult } from "express-validator"


const resultadoValidacion = (req, res, next) => {
    const errores = validationResult(req)
    //ocurrieron errores en la validacion
    if (!errores.isEmpty()) {
        //enviamos mensaje de error 400 (bad request)
        return res.status(400).json(errores.array())
    }
    //continua conla siguiente ejecucion
    next()
}

export default resultadoValidacion; 
