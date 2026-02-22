import Historial from "../models/Historial.js";

export const crearHistorial = async (req, res) => {
  try {
    const nuevoHistorial = new Historial(req.body);
    await nuevoHistorial.save();
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(500).json({ message: "Error al crear historial", error });
  }
};

export const obtenerHistorialPorPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const historial = await Historial.find({ pacienteId });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener historial", error });
  }
};
