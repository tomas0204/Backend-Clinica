import mongoose from "mongoose";
import {Schema} from "mongoose"

const guardiaSchema = new Schema({
    nombreGuardia: {
        type: String,
        minLength: 5,
        maxLength: 30,
        required: true,
        trim: true
    },
    entradaGuardia: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },
    salidaGuardia: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    }   
},
{
    timestamps: true
})

const Guardia = mongoose.model("Guardia", guardiaSchema)

export default Guardia