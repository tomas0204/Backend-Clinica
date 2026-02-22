import Paciente from "../models/Paciente.js"


export const prueba = (req, res) => {
    console.log("desde el controlador de prueba");
    res.send("Prueba desde el controlador");
};
export const crearPaciente = async (req, res) => {
    try {
        const { contraseña, confirmarContraseña } = req.body;
        if (!contraseña || !confirmarContraseña) {
            return res.status(400).json({
                mensaje: "Debe completar ambos campos de contraseña",
            });
        }
        if (contraseña !== confirmarContraseña) {
            return res.status(400).json({
                mensaje: "Las contraseñas no coinciden",
            });
        }
        delete req.body.confirmarContraseña;
        const pacienteNuevo = new Paciente(req.body);
        await pacienteNuevo.save();
        res.status(201).json({
            mensaje: "El paciente fue creado exitosamente",
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: error.message,
            });
        }
        res.status(500).json({
            mensaje: "Ocurrió un error al crear paciente",
        });
    }
};
export const listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Ocurrió un error al listar los pacientes",
        });
    }
};
export const obtenerPaciente = async (req, res) => {
    try {
        const pacienteBuscado = await Paciente.findById(req.params.id);

        if (!pacienteBuscado) {
            return res.status(404).json({
                mensaje: "No se encontró el paciente",
            });
        }
        res.status(200).json(pacienteBuscado);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Ocurrió un error al obtener el paciente",
        });
    }
};
export const borrarPacientePorID = async (req, res) => {
    try {
        const pacienteBuscado = await Paciente.findByIdAndDelete(req.params.id);
        if (!pacienteBuscado) {
            return res.status(404).json({
                mensaje: "No se encontró el paciente",
            });
        }
        res.status(200).json({
            mensaje: "El paciente fue eliminado correctamente",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Ocurrió un error al eliminar paciente",
        });
    }
};
export const editarPacientePorID = async (req, res) => {
    try {
        const pacienteActualizado = await Paciente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!pacienteActualizado) {
            return res.status(404).json({
                mensaje: "No se encontró el paciente",
            });
        }
        res.status(200).json({
            mensaje: "El paciente fue actualizado correctamente",
            paciente: pacienteActualizado,
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: error.message,
            });
        }
        res.status(500).json({
            mensaje: "Ocurrió un error al actualizar paciente",
        });
    }
};