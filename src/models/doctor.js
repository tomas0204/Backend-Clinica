import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const doctorSchema = new mongoose.Schema({
    nombre_medico: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        maxlength: [15, "Máximo 15 caracteres"]
    },
    apellido_medico: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        maxlength: [15, "Máximo 15 caracteres"]
    },
    especialidad: {
        type: String,
        required: [true, "La especialidad es obligatoria"]
    },
    email_medico: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        maxlength: [40, "Máximo 40 caracteres"]
    },
    contrasena: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    role: { type: String, default: "medico" }
}, { timestamps: true });

// --- MIDDLEWARES DE BCRYPT CORREGIDOS ---

// Hash al crear: Se quita el parámetro 'next' porque es una función async
doctorSchema.pre("save", async function () {
    if (!this.isModified("contrasena")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.contrasena = await bcrypt.hash(this.contrasena, salt);
    } catch (error) {
        throw new Error("Error al encriptar la contraseña");
    }
});

// Hash al editar: Se quita el parámetro 'next'
doctorSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    
    // Si hay una contraseña nueva y no es un texto vacío
    if (update.contrasena && update.contrasena.trim() !== "") {
        try {
            const salt = await bcrypt.genSalt(10);
            update.contrasena = await bcrypt.hash(update.contrasena, salt);
        } catch (error) {
            throw new Error("Error al encriptar la nueva contraseña");
        }
    } else {
        // Importante: Eliminar el campo del update si viene vacío 
        // para que no sobreescriba la contraseña actual con nada
        delete update.contrasena;
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;