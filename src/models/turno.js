import mongoose, { Schema } from "mongoose"

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
    match: /^\d{4}-\d{2}-\d{2}$/ 
  },
  hora: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/ 
  },
  motivoConsulta: {
    type: String,
    minLength: 2,
    maxLength: 150,
    required: true,
    trim: true
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
  },
  paymentId: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
  estadoPago: {
  type: String,
  enum: ["Pendiente", "Pagado", "Rechazado", "Cancelado"],
  default: "Pendiente"
}
}, {
  timestamps: true
});

const Turno = mongoose.model("turno", turnoSchema)

export default Turno