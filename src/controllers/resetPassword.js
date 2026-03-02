import crypto from "crypto";
import Paciente from "../models/paciente.js";
import Doctor from "../models/doctor.js";
import { sendResetEmail } from "./resetPasswordMail.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar usuario por email
    let user = await Paciente.findOne({ email });
    console.log(user);
    if (!user) {
      user = await Doctor.findOne({ email });
    }

    console.log(user);


    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return res.status(200).json({
        message: "Si el email existe, se enviará un enlace de recuperación"
      });
    }
    // Generar token seguro
    const token = crypto.randomBytes(32).toString("hex");

    // Guardar token y expiración (1 hora)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    // Guardar sin validar otras propiedades (no rompe con la contraseña hasheada)
    await user.save({ validateBeforeSave: false });

    // 👀 Por ahora solo mostramos token en consola
    console.log(`Token de recuperación para ${email}: ${token}`);

    // Generar link completo
    const resetLink = `https://clinica-eight-beryl.vercel.app/reset-password/${token}`;

    // Enviar correo
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({
      message: "Si el email existe, se enviará un enlace de recuperación"
    });

  } catch (error) {
    console.error("ERROR forgotPassword:", error);
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, contraseña } = req.body;

    if (!token || !contraseña) {
      return res.status(400).json({
        message: "Token y contraseña son obligatorios"
      });
    }

    // Buscar usuario por token en Paciente o Doctor
    let user = await Paciente.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      user = await Doctor.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
    }

    console.log(user);
    

    if (!user) {
      return res.status(400).json({
        message: "Token inválido o expirado"
      });
    }

    // Actualizar contraseña
    user.contraseña = contraseña;

    // Limpiar token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Contraseña actualizada correctamente"
    });

  } catch (error) {
    console.error("ERROR resetPassword:", error);
    res.status(500).json({ message: error.message });
  }
};