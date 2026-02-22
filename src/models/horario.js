import mongoose from "mongoose";

const horarioSchema = new mongoose.Schema({
  medicoNombre: {
    type: String,
    required: true,
  },
  diaSemana: {
    type: Number, // 0 domingo - 6 sábado
    required: true,
  },
  horaInicio: {
    type: Date, // "08:00"
    required: true,
  },
  horaFin: {
    type: Date, // "18:00"
    required: true,
  },
});

export default mongoose.model("Horario", horarioSchema);