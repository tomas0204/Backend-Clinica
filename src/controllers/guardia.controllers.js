import Guardia from "../models/guardia.js"

export const crearGuardia = async (req, res) =>{
    try {
        const guardiaNueva = new Guardia (req, res)
        await guardiaNueva.save()

        res.status(201).json({
            mensaje: "Guardia creada exitosamente",
            guardia: guardiaNueva
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al crear su guardia"})
    }
}