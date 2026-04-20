import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const enviarEmailBienvenidaMedico = async ({ nombre, apellido, email, especialidad, contrasena }) => {
  const mailOptions = {
    from: `"Sistema Médico" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ Bienvenido al Sistema Médico",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #0d6efd; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">👨‍⚕️ Bienvenido al Sistema</h1>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px;">Hola <strong>Dr/a. ${nombre} ${apellido}</strong>,</p>
          <p>Tu cuenta ha sido creada exitosamente. A continuación tus datos de acceso:</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Especialidad</strong></td>
              <td style="padding: 10px; border: 1px solid #dee2e6;">${especialidad}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Email</strong></td>
              <td style="padding: 10px; border: 1px solid #dee2e6;">${email}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Contraseña</strong></td>
              <td style="padding: 10px; border: 1px solid #dee2e6;">${contrasena}</td>
            </tr>
          </table>

          <p style="color: #dc3545; font-size: 13px;">
            🔒 Por seguridad, te recomendamos cambiar tu contraseña al ingresar por primera vez.
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 16px; text-align: center; font-size: 12px; color: #6c757d;">
          Este es un mensaje automático, por favor no respondas este correo.
        </div>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};