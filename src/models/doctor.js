import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
  {
    nombre_y_apellido: {
      type: String,
      required: [true, "El nombre y apellido es obligatorio"],
      minlength: [5, "Debe tener al menos 5 caracteres"],
      maxlength: [40, "No debe superar los 40 caracteres"],
      trim: true,
      unique: true
    },

    celular: {
      type: String,
      required: [true, "El celular es obligatorio"],
      match: [/^[0-9]+$/, "Solo se permiten números"],
      minlength: [9, "Debe tener al menos 9 dígitos"]
    },

    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9-]+\.)+[a-z0-9-]+$/,
        "Email inválido"
      ]
    },

    obraSocial: {
      type: String,
      required: [true, "Debe seleccionar una obra social"],
      enum: ["Prensa", "Red de Seguro Medico", "Pami", "Osecac", "Particular"]
    },

    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "Debe tener al menos 6 caracteres"]
    },

    role: {
      type: String,
      default: "paciente",
      enum: ["paciente"]
    }
  },
  {
    timestamps: true // agrega createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("Paciente", pacienteSchema);
