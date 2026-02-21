import Doctor from "../models/doctor.js"; 



export const crearDoctor = async (req, res) => {
    //enviamos una respuesta
   //res.send('aqui tenemos que crear el producto')


    try {
        console.log(req.body);
         const doctorNuevo = new Doctor(req.body);

        await doctorNuevo.save();

        res.status(201).json({mensaje:'El doctor fue creado exitosamente'})

    } catch (error) {
         console.error(error);
         // 500 error interno del server
         res.status(500).json({mensaje: 'Ocurrio un error al crear el doctor'})
    }

}

export const listarDoctores = async (req, res) => {
        try {
            const doctores = await Doctor.find();
            res.status(200).json(doctores) 
        } catch (error) {
            console.error(error);
            res.status(500).json({mensaje: 'Ocurrio un error al listar los doctores'})
        }
    }

export const obtenerDoctor = async (req, res) => {
    try {

        console.log(req.params.id);
        const doctorBuscado = await Doctor.findById(req.params.id);
        if(!doctorBuscado){
            //404 not found 
            return res.status(404).json({mensaje:'No se encontro el doctor'})
        }
        res.status(200).json(doctorBuscado)

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Ocurrio un error al listar el doctor'})
    }
}


export const borrarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndDelete(req.params.id);
        if(!doctorBuscado){
            return res.status(404).json({mensaje: "No se encontro el doctor"})
        }
        return res.status(200).json({mensaje: "El doctor fue eliminado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al eliminar el doctor"})

    }

}

export const editarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndUpdate(req.params.id, req.body);
        if(!doctorBuscado){
            return res.status(404).json({mensaje: "No se encontro el doctor"})
        }
        return res.status(200).json({mensaje: "El doctor fue actualizado correctamente"})

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al actualizar el doctor"})

    }
}