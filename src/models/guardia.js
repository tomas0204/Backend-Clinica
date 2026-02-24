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
        required: true
    },
    salidaGuardia: {
        type: String,
        required: true
    }   
},
{
    timestamps: true
})

const Guardia = mongoose.model("Guardia", guardiaSchema)

export default Guardia