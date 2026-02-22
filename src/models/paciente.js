import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
            minlength: [9, "Debe tener al menos 9 dígitos"],
            match: [/^[0-9]+$/, "Solo se permiten números"]
        },

        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true,
            lowercase: true,
            match: [
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                "El email no es válido"
            ]
        },

        obraSocial: {
            type: String,
            required: [true, "Debe seleccionar una obra social"],
            enum: {
                values: ["Prensa", "Red de Seguro Medico", "Pami", "Osecac", "Particular"],
                message: "Obra social no válida"
            }
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
            enum: ["paciente", "medico", "admin"],
            default: "paciente"
        },
    },
    {
        timestamps: true
    }
);

//
// 🔐 HASH antes de guardar
//
pacienteSchema.pre("save", async function (next) {
    if (!this.isModified("contraseña")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.contraseña = await bcrypt.hash(this.contraseña, salt);
        next();
    } catch (error) {
        next(error);
    }
});

//
// 🔎 Método para login futuro
//
pacienteSchema.methods.compararPassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.contraseña);
};

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;
