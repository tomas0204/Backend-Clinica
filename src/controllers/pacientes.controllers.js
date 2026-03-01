import Paciente from "../models/paciente.js"

export const prueba = (req, res) => {
    console.log("desde el controlador de prueba");
    res.send("Prueba desde el controlador");
};

export const crearPaciente = async (req, res) => {
    try {
        const { contraseña, confirmarContraseña, contraseña_confirmar } = req.body;

        const passwordConfirm = confirmarContraseña || contraseña_confirmar;

        if (!contraseña || !passwordConfirm) {
            return res.status(400).json({
                mensaje: "Debe completar ambos campos de contraseña",
            });
        }

        if (contraseña !== passwordConfirm) {
            return res.status(400).json({
                mensaje: "Las contraseñas no coinciden",
            });
        }

        delete req.body.confirmarContraseña;
        delete req.body.contraseña_confirmar;

        req.body.role = "paciente";

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
        const pacienteBuscado = await Paciente.findById(req.params.id);

        if (!pacienteBuscado) {
            return res.status(404).json({
                mensaje: "No se encontró el paciente",
            });
        }

        if (pacienteBuscado.role === "admin") {

            const cantidadAdmins = await Paciente.countDocuments({ role: "admin" });

            if (cantidadAdmins <= 1) {
                return res.status(400).json({
                    mensaje: "No se puede eliminar al último administrador",
                });
            }
        }

        await Paciente.findByIdAndDelete(req.params.id);

        return res.status(200).json({
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