import mongoose from "mongoose";
const consultaSchema = new mongoose.Schema(
  {
    fecha: { type: String },
    motivo: { type: String },
    diagnostico: { type: String },
    indicaciones: { type: String }
  },
  { _id: false }
);

const historialSchema = new mongoose.Schema({
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  motivo: {
    type: String
  },
  indicaciones: {
    type: String
  },
  profesional: {
    type: String
  },
  nombre: { type: String },
  obraSocial: { type: String },
  nroAfiliado: { type: String },
  antecedentes: { type: String },
  alergias: { type: String },
  medicacionHabitual: { type: String },
  consultas: {
    type: [consultaSchema],
    default: []
  }
});

export default mongoose.model("Historial", historialSchema);
