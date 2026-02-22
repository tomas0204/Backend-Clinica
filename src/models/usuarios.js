import mongoose from "mongoose";
import bcrypt from "bcrypt";

const pacienteLoginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "El email no es válido",
      ],
    },

    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para hashear la contraseña antes de guardar (registro o update)
pacienteLoginSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseña al hacer login
pacienteLoginSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.contraseña);
};

const PacienteLogin = mongoose.model("PacienteLogin", pacienteLoginSchema);

export default PacienteLogin;