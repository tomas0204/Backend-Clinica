import mongoose from "mongoose";
import Historial from "../models/Historial.js";

export const crearHistorial = async (req, res) => {
  try {
    const { pacienteId } = req.body;

    if (!pacienteId || !mongoose.Types.ObjectId.isValid(pacienteId)) {
      return res.status(400).json({ message: "pacienteId inválido" });
    }

    const nuevoHistorial = new Historial(req.body);
    await nuevoHistorial.save();
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    const statusCode =
      error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
    res.status(statusCode).json({
      message: "Error al crear historial",
      error: error.message
    });
  }
};

export const obtenerHistorialPorPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pacienteId)) {
      return res.status(400).json({ message: "pacienteId inválido" });
    }

    const historial = await Historial.find({ pacienteId }).sort({ fecha: -1 });
    res.json(historial);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener historial",
      error: error.message
    });
  }
};

export const obtenerHistorialPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const historial = await Historial.findById(id);

    if (!historial) {
      return res.status(404).json({ message: "Historial no encontrado" });
    }

    res.json(historial);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener historial",
      error: error.message
    });
  }
};


export const actualizarHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const historialActualizado = await Historial.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!historialActualizado) {
      return res.status(404).json({
        message: "Historial no encontrado"
      });
    }

    res.json(historialActualizado);

  } catch (error) {
    const statusCode =
      error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
    res.status(statusCode).json({
      message: "Error al actualizar historial",
      error: error.message
    });
  }
};


export const eliminarHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const historialEliminado = await Historial.findByIdAndDelete(id);

    if (!historialEliminado) {
      return res.status(404).json({
        message: "Historial no encontrado"
      });
    }

    res.json({
      message: "Historial eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar historial",
      error: error.message
    });
  }
};
