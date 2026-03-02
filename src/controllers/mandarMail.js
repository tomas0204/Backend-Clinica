// src/utils/email.js
import nodemailer from "nodemailer";

export const sendResetEmail = async (to, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Recuperación de contraseña",
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">Restablecer contraseña</a>
        <p>Este enlace expira en 1 hora.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (err) {
    console.error("Error enviando correo:", err);
    throw new Error("No se pudo enviar el correo");
  }
};