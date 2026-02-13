import Paciente from "../models/paciente.js";


export const prueba = (req, res) => {
    console.log('desde el controlador de prueba');
    res.send('Prueba desde el controlador');
}

export const crearPaciente = async (req, res) => {
    //enviamos una respuesta
    // res.send('Aqui tenemos que crear el paciente')

    try {
        console.log(req.body)


        const pacienteNuevo = new Paciente(req.body);

        await pacienteNuevo.save();

         res.status(201).json({ mensaje: 'El paciente fue creado exitosamente' })


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear paciente' })

    }
}

