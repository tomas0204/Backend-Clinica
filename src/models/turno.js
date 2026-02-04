import mongoose, {Schema} from "mongoose"

const turnoSchema = new Schema({
    nombreTurno:{
        type: String,
        minLength: 2,
        maxLenght: 100,
        required: true,
        unique: true
    }
})

const Tarea = mongoose.model("turno", turnoSchema)

export default Tarea