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
        match: [
            /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,12}$/,
            "La contraseña debe tener entre 6 y 12 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
        ]
    },

    role: {
        type: String,
        default: "medico",
        enum: ["medico"]
    },
    resetPasswordToken: {
        type: String,
    },

    resetPasswordExpires: {
        type: Date,
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
