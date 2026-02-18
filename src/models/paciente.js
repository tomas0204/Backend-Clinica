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


    },
    {
        timestamps: true
    }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;
