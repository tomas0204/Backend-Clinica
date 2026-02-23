import mongoose from "mongoose";
import Schema from mongoose

const guardiaSchema = new Schema({
    nombre: {
        type: String,
        minLength: 5,
        maxLength: 30,
        required: true,
        trim: true
    },
    entrada: {
        type: Number,
        required: true
    },
    salida: {
        type: Number,
        required: true
    }   
},
{
    timestamps: true
})

const Guardia = mongoose.model("Guardia", guardiaSchema)

export default Guardia