import jwt from "jsonwebtoken";
import Paciente from "../models/paciente.js";
import Doctor from "../models/doctor.js";

export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    const paciente = await Paciente.findOne({ email });
    const medico = await Doctor.findOne({ email });

    if (!paciente && !medico) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas"
      });
    }

    const usuario = paciente || medico;

    const passwordValida = await usuario.compararPassword(contraseña);

    if (!passwordValida) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        role: usuario.role,
        nombre_y_apellido: usuario.nombre_y_apellido
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      role: usuario.role
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error en el login"
    });
  }
};