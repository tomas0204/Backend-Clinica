import Doctor from "../models/doctor.js";
import { bienvenidaMail } from "./bienvenidaMail.js";

export const crearDoctor = async (req, res) => {
    try {
        console.log(req.body);

        // 🔎 Verificar si ya existe el email
        const existeDoctor = await Doctor.findOne({ email: req.body.email });

        if (existeDoctor) {
            return res.status(409).json({
                mensaje: "El email ya está registrado",
            });
        }

        const doctorNuevo = new Doctor(req.body);
        await doctorNuevo.save();

        await bienvenidaMail(
            doctorNuevo.email,
            doctorNuevo.nombre_y_apellido,
            "https://clinica-eight-beryl.vercel.app/login"
        );

        console.log("CORREO ENVIADO " + doctorNuevo.email);

        res.status(201).json({
            mensaje: "El doctor fue creado exitosamente",
        });

    } catch (error) {
        console.error(error);

        // 🔥 ESTE ES EL NUEVO BLOQUE
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "El email ya está registrado",
            });
        }

        if (error.name === "ValidationError") {
            const errores = Object.values(error.errors).map(err => ({
                campo: err.path,
                mensaje: err.message
            }));

            return res.status(400).json({ errores });
        }

        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

export const listarDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.find();
        res.status(200).json(doctores)
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrio un error al listar los doctores' })
    }
}

export const obtenerDoctor = async (req, res) => {
    try {

        console.log(req.params.id);
        const doctorBuscado = await Doctor.findById(req.params.id);
        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: 'No se encontro el doctor' })
        }
        res.status(200).json(doctorBuscado)

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrio un error al listar el doctor' })
    }
}


export const borrarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontro el doctor" })
        }
        return res.status(200).json({ mensaje: "El doctor fue eliminado correctamente" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrio un error al eliminar el doctor" })

    }

}

export const editarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontro el doctor" })
        }
        return res.status(200).json({
            mensaje: "El doctor fue actualizado correctamente",
            doctor: doctorBuscado
        })

    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ mensaje: error.message });
        }
        res.status(500).json({ mensaje: "Ocurrio un error al actualizar el doctor" })

    }
}
