import Doctor from "../models/doctor.js"; 

export const prueba = (req, res) => {
    console.log('desde el controlador de prueba');
    res.send('Prueba desde el controlador');

}

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
