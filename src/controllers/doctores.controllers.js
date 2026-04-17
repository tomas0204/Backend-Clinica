import Doctor from "../models/doctor.js";

export const crearDoctor = async (req, res) => {
    try {
        // Quitamos 'celular' de la desestructuración
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
        res.status(201).json({ mensaje: "El doctor fue creado exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrio un error al crear el doctor" });
    }
};

export const listarDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.find().select("-contrasena");
        res.status(200).json(doctores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrio un error al listar los doctores" });
    }
};

export const obtenerDoctor = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findById(req.params.id).select("-contrasena");

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontro el doctor" });
        }

        res.status(200).json(doctorBuscado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrio un error al obtener el doctor" });
    }
};

export const editarDoctorPorID = async (req, res) => {
    try {
        // Quitamos 'celular' de la desestructuración
        const { nombre_medico, apellido_medico, especialidad, contrasena } = req.body;

        const datosActualizados = {
            nombre_medico,
            apellido_medico,
            especialidad,
            // Solo actualiza contrasena si se envio una nueva
            ...(contrasena && { contrasena })
        };

        const doctorActualizado = await Doctor.findByIdAndUpdate(
            req.params.id,
            datosActualizados,
            { new: true, runValidators: true }
        );

        if (!doctorActualizado) {
            return res.status(404).json({ mensaje: "No se encontro el doctor" });
        }

        res.status(200).json({ mensaje: "El doctor fue actualizado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrio un error al actualizar el doctor" });
    }
};

export const borrarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontro el doctor" });
        }

        res.status(200).json({ mensaje: "El doctor fue eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrio un error al eliminar el doctor" });
    }
};