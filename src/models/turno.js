import mongoose, {Schema} from "mongoose"

const turnoSchema = new Schema({
  pacienteNombre: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    trim: true
  },
  medicoNombre: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    trim: true
  },
  fecha: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD
  },
  hora: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:mm 24hs
  },
  estado: {
    type: String,
    enum: [
      'Pendiente',
      'Confirmado',
      'Cancelado',
      'Atendido',
      'Reprogramado'
    ],
    default: 'Pendiente',
    required: true
  }
}, {
  timestamps: true
});

const Tarea = mongoose.model("turno", turnoSchema)

export default Tarea