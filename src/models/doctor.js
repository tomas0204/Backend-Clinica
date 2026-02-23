import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;


const doctorSchema = new mongoose.Schema({
    nombre_y_apellido: {
        type: String,
        required: [true, "El nombre y apellido es obligatorio"],
        minlength: [5, "Debe tener al menos 5 caracteres"],
        maxlength: [40, "No debe superar los 40 caracteres"],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        lowercase: true
    },

    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "Debe tener al menos 6 caracteres"]
    },

    role: {
        type: String,
        default: "medico",
        enum: ["medico"]
    }
}, {
    timestamps: true
});

doctorSchema.pre("save", async function () {
    if (!this.isModified("contraseña")) return;

    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
});

doctorSchema.methods.compararPassword = async function (passwordIngresada) {
    console.log(passwordIngresada);
    console.log(this.contraseña);
    
    return await bcrypt.compare(passwordIngresada, this.contraseña);
};


const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
