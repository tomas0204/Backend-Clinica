import nodemailer from "nodemailer";

export const bienvenidaMail = async (to, nombre, loginLink) => {
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
      subject: "¡Bienvenido/a a Clínica Bienestar 360!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
          
          <div style="background-color: #00a86b; color: white; padding: 25px; text-align: center;">
            <h1 style="margin: 0;">Clínica Bienestar 360</h1>
            <p style="margin: 5px 0 0 0;">Tu salud, nuestra prioridad</p>
          </div>

          <div style="padding: 35px; color: #333;">
            <h2 style="color: #00a86b; margin-top: 0;">¡Hola ${nombre}! 👋</h2>
            
            <p>
              Nos alegra informarte que tu cuenta ha sido creada exitosamente.
            </p>

            <p>
              Ya puedes acceder a la plataforma y comenzar a gestionar tus servicios
              de manera rápida y segura.
            </p>

            <div style="text-align: center; margin: 35px 0;">
              <a 
                href="${loginLink}" 
                style="
                  background-color: #00a86b;
                  color: white;
                  padding: 14px 28px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                  display: inline-block;
                "
              >
                Iniciar sesión
              </a>
            </div>

            <p style="font-size: 14px; color: #666;">
              Si tienes alguna consulta o necesitas asistencia, nuestro equipo está listo para ayudarte.
            </p>

            <p>
              Bienvenido/a a la comunidad,<br>
              <strong>Equipo de Clínica Bienestar 360</strong>
            </p>
          </div>

          <div style="background-color: #f5f5f5; color: #888; text-align: center; padding: 15px; font-size: 12px;">
            © 2026 Clínica Bienestar 360. Todos los derechos reservados.
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo de bienvenida enviado:", info.response);
  } catch (err) {
    console.error("Error enviando correo:", err);
    throw new Error("No se pudo enviar el correo");
  }
};