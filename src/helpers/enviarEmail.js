import nodemailer from 'nodemailer';

export const enviarEmailBienvenida = async (destinatario, nombreMedico) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
  });

  const mailOptions = {
    from: '"Clínica de Salud" <tu-email@gmail.com>',
    to: destinatario,
    subject: '¡Bienvenido al equipo médico!',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2c3e50;">Hola, Dr/a. ${nombreMedico}</h2>
        <p>Tu registro en la <strong>Cartilla Médica</strong> se ha completado con éxito.</p>
        <p>Ya puedes gestionar tus turnos y pacientes desde nuestra plataforma.</p>
        <hr />
        <small style="color: #7f8c8d;">Este es un mensaje automático, por favor no lo responda.</small>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email de bienvenida enviado a: " + destinatario);
  } catch (error) {
    console.error("❌ Error al enviar el email:", error);
  }
};