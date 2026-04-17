import Doctor from "../models/doctor.js";
import { enviarEmailBienvenida } from "../helpers/enviarEmail.js";

export const crearDoctor = async (req, res) => {
    try {
        const { nombre_medico, apellido_medico, especialidad, email_medico, contrasena } = req.body;

        const doctorNuevo = new Doctor({
            nombre_medico,
            apellido_medico,
            especialidad,
            email_medico,
            contrasena,
            role: "medico"
        });

        await doctorNuevo.save();
        enviarEmailBienvenida(doctorNuevo.email_medico, doctorNuevo.nombre_medico);

        res.status(201).json({ mensaje: "El doctor fue creado exitosamente" });

    } catch (error) {
        console.error("LOG DE ERROR EN BACKEND:", error);

       
        if (error.code === 11000) {
            return res.status(400).json({ 
                mensaje: "Este email ya está registrado en nuestra base de datos." 
            });
        }

        if (error.name === "ValidationError") {
           
            const mensajeValidacion = Object.values(error.errors)[0].message;
            return res.status(400).json({ mensaje: mensajeValidacion });
        }

       
        res.status(500).json({ mensaje: "Ocurrió un error interno al crear el doctor." });
    }
};

export const listarDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.find().select("-contrasena");
        res.status(200).json(doctores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrió un error al listar los doctores" });
    }
};

export const obtenerDoctor = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findById(req.params.id).select("-contrasena");

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontró el doctor" });
        }

        res.status(200).json(doctorBuscado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrió un error al obtener el doctor" });
    }
};

export const editarDoctorPorID = async (req, res) => {
    try {
        const { nombre_medico, apellido_medico, especialidad, contrasena } = req.body;

        const datosActualizados = {
            nombre_medico,
            apellido_medico,
            especialidad,
            ...(contrasena && contrasena.trim() !== "" && { contrasena })
        };

        const doctorActualizado = await Doctor.findByIdAndUpdate(
            req.params.id,
            datosActualizados,
            { new: true, runValidators: true }
        );

        if (!doctorActualizado) {
            return res.status(404).json({ mensaje: "No se encontró el doctor" });
        }

        res.status(200).json({ mensaje: "El doctor fue actualizado correctamente" });

    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            const mensajeValidacion = Object.values(error.errors)[0].message;
            return res.status(400).json({ mensaje: mensajeValidacion });
        }

        res.status(500).json({ mensaje: "Ocurrió un error al actualizar el doctor" });
    }
};

export const borrarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontró el doctor" });
        }

        res.status(200).json({ mensaje: "El doctor fue eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrió un error al eliminar el doctor" });
    }
};