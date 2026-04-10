import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;


const doctorSchema = new mongoose.Schema({
    nombre_y_apellido: {
        type: String,
        required: [true, "El nombre y apellido es obligatorio"],
        minlength: [5, "Debe tener al menos 5 caracteres"],
        maxlength: [40, "No debe superar los 40 caracteres"],
        trim: true
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
        lowercase: true
    },

    contrasena: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "Debe tener al menos 6 caracteres"]
    },

    role: {
        type: String,
        default: "doctor",
        enum: ["doctor"]
    }
}, {
    timestamps: true
});

doctorSchema.pre("save", async function () {
    if (!this.isModified("contrasena")) return;

    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
});



const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
