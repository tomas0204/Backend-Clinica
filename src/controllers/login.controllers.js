import jwt from "jsonwebtoken";
import Paciente from "../models/paciente.js";

export const loginPaciente = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // 1️⃣ Verificar que venga todo
    if (!email || !contraseña) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    // 2️⃣ Buscar paciente
    const paciente = await Paciente.findOne({ email });

    if (!paciente) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas del paciente"
      });
    }

    // 3️⃣ Comparar password
    const passwordValida = await paciente.compararPassword(contraseña);

    if (passwordValida === false) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta del paciente"
      });
    }

    // 4️⃣ Generar JWT
    const token = jwt.sign(
      {
        id: paciente._id,
        role: paciente.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    // 5️⃣ Respuesta
    res.status(200).json({
      mensaje: "Login exitoso",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error en el login"
    });
  }
};
