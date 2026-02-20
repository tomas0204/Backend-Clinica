import Paciente from "../models/paciente.js";

export const crearUsuarioAdmin = async (req, res) => {
  try {

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        mensaje: "No autorizado"
      });
    }

    const { contraseña, contraseña_confirmar } = req.body;

    if (contraseña !== contraseña_confirmar) {
      return res.status(400).json({
        mensaje: "Las contraseñas no coinciden"
      });
    }

    delete req.body.contraseña_confirmar;

    const nuevoAdmin = new Paciente({
      ...req.body,
      role: "admin"
    });

    await nuevoAdmin.save();

    res.status(201).json({
      mensaje: "Admin creado correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al crear admin"
    });
  }
};