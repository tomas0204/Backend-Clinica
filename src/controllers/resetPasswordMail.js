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
      subject: "Recuperación de contraseña - Clínica Bienestar 360",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #00a86b; color: white; padding: 20px; text-align: center;">
            <h1>Clínica Bienestar 360</h1>
          </div>
          <div style="padding: 30px; color: #333;">
            <h2 style="color: #00a86b;">Recuperación de contraseña</h2>
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para continuar:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #00a86b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer contraseña</a>
            </div>
            <p>Este enlace expira en <strong>1 hora</strong>. Si no solicitaste el cambio, puedes ignorar este correo.</p>
            <p>Gracias por confiar en nosotros,<br>El equipo de Clínica Bienestar 360</p>
          </div>
          <div style="background-color: #f5f5f5; color: #888; text-align: center; padding: 15px; font-size: 12px;">
            © 2026 Clínica Bienestar 360. Todos los derechos reservados.
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (err) {
    console.error("Error enviando correo:", err);
    throw new Error("No se pudo enviar el correo");
  }
};