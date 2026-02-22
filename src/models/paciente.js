import mongoose from "mongoose";



const pacienteSchema = new mongoose.Schema(
  {
    nombre_y_apellido: {
      type: String,
      required: true,
      trim: true
    },
    celular: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    obraSocial: {
      type: String,
      required: true,
      enum: ["Prensa", "Red de Seguro Medico", "Pami", "Osecac", "Particular"]
    },
    contraseña: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);


const paciente = mongoose.models.Paciente || mongoose.model("Paciente", pacienteSchema);

export default paciente;