import jwt from "jsonwebtoken";
import Paciente from "../models/paciente.js";
import Doctor from "../models/doctor.js";

export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // 1️⃣ Verificar datos
    if (!email || !contraseña) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    // 2️⃣ Buscar en ambas colecciones
    const paciente = await Paciente.findOne({ email });
    const medico = await Doctor.findOne({ email });

    // 🔥 Correcto: ninguno existe
    if (!paciente && !medico) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas"
      });
    }

    // 3️⃣ Determinar qué usuario existe
    const usuario = paciente || medico;

    // 4️⃣ Comparar contraseña
    const passwordValida = await usuario.compararPassword(contraseña);

    if (!passwordValida) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    // 5️⃣ Generar token
    const token = jwt.sign(
      {
        id: usuario._id,
        role: usuario.role,
        nombre_y_apellido: usuario.nombre_y_apellido
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    // 6️⃣ Respuesta
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