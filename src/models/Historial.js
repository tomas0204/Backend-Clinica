import mongoose from "mongoose";
const historialSchema = new mongoose.Schema({
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",   // referencia al modelo Paciente
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  motivo: {
    type: String,
    required: true
  },
  indicaciones: {
    type: String,
    required: true
  },
  profesional: {
    type: String
  }
});

export default mongoose.model("Historial", historialSchema);
