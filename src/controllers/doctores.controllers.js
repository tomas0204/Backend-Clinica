import Doctor from "../models/doctor.js";

export const crearDoctor = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { nombre_y_apellido, especialidad, email, contrasena } = req.body;

        const doctorNuevo = new Doctor({
            nombre_y_apellido,
            especialidad,
            email,
            celular: "3810000000",
            contrasena,
            role: "doctor"
        });

        await doctorNuevo.save();

        res.status(201).json({ mensaje: 'Doctor creado correctamente' });

    } catch (error) {
        console.error("ERROR BACKEND:", error);
        res.status(500).json({ 
            mensaje: 'Error al crear doctor',
            error: error.message  
        });
    }
};

export const listarDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.find();
        res.status(200).json(doctores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al listar los doctores' });
    }
};

export const obtenerDoctor = async (req, res) => {
    try {
        console.log(req.params.id);

        const doctorBuscado = await Doctor.findById(req.params.id);

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }

        res.status(200).json(doctorBuscado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el doctor' });
    }
};

export const borrarDoctorPorID = async (req, res) => {
    try {
        const doctorBuscado = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontró el doctor" });
        }

        return res.status(200).json({ mensaje: "El doctor fue eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrió un error al eliminar el doctor" });
    }
};

export const editarDoctorPorID = async (req, res) => {
    try {
        // 🔥 También transformamos datos al editar
        const { nombre, apellido, especialidad, email_medico, contrasena } = req.body;

        const datosActualizados = {
            nombre_y_apellido: `${nombre} ${apellido}`,
            especialidad: especialidad,
            email: email_medico,
            contrasena: contrasena,
            role: "doctor"
        };

        const doctorBuscado = await Doctor.findByIdAndUpdate(
            req.params.id,
            datosActualizados,
            { new: true }
        );

        if (!doctorBuscado) {
            return res.status(404).json({ mensaje: "No se encontró el doctor" });
        }

        return res.status(200).json({ mensaje: "El doctor fue actualizado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Ocurrió un error al actualizar el doctor" });
    }
};