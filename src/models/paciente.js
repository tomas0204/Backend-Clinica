import mongoose, { Schema } from 'mongoose';

const pacienteSchema = new mongoose.Schema(
    {
        nombre_y_apellido: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 40,
            trim: true,
            unique: true
        },

        celular: {
            type: String,
            required: true,
            minlength: 9,
            match: /^[0-9]+$/
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match:
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        },

        obraSocial: {
            type: String,
            required: true,
            enum: ["Prensa", "Red de Seguro Medico", "Pami", "Osecac", "Particular"]
        },

        contraseña: {
            type: String,
            required: true,
            match:
                /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/
        }
    },
    {
        timestamps: true
    }
);

const Paciente = mongoose.model("paciente", pacienteSchema);

export default Paciente;
