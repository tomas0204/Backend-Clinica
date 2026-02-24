import Guardia from "../models/guardia.js"

export const pruebaGuardia = (req, res) => {
    console.log("desde el controlador de prueba de guardia");
    res.send("Prueba desde el controlador de guardia")
}

export const crearGuardia = async (req, res) =>{
    try {
        const guardiaNueva = new Guardia (req.body)
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

export const listarGuardia = async (req, res) =>{
    try {
        const guardias = await Guardia.find()
        res.status(200).json(guardias)
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error, no se puedieron listar las guardias"})
    }
}

export const obtenerGuardiaPorID = async (req, res) =>{
    try {
        console.log(req.params);
        const guardiaBuscadaID = await Guardia.findById(req.params.id)

        if (!guardiaBuscadaID) {
            return res.status(404).json({mensaje: "No se encontro la guardia"})
        }
        res.status(200).json(guardiaBuscadaID)

        
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error, no se pudo obtener la guardia buscada"})
    }
}

export const eliminarGuardiaPorID = async (req, res) =>{
    try {
        console.log(req.params);
        
        const guardiaParaEliminar = await Guardia.findByIdAndDelete(req.params.id)

        if (!guardiaParaEliminar) {
            return res.status(404).json({mensaje: "No se encontro la guardia para eliminar"})
        }
        res.status(200).json(guardiaParaEliminar)

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al eliminar la guardia"})
    }
}

export const editarGuardiaPorID = async (req, res) =>{
    try {
        const guardiaParaEditar = await Guardia.findByIdAndUpdate(req.params.id, req.body)

        if (!guardiaParaEditar) {
            return res.status(404).json({mensaje: "No se encontro la guardia para editar"})
        }
        res.status(200).json(guardiaParaEditar)

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al eliminar la guardia "})
        
    }
}