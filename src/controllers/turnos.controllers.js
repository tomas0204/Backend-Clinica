import Turno from "../models/turno.js"

const crearTurno = async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body)

    await nuevoTurno.save()
    res.status(201).json(nuevoTurno);
  } catch (error) {

    res.status(500).send("Error al crear turno");
  }
};

const obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find()
    res.status(200).json(turnos)
  } catch (error) {

    res.status(500).json({ mensaje: "Ocurrió un Error al listar los turnos." })
  }
}

const obtenerTurno = async (req, res, _id) => {
  try {
    const turnoBuscado = await Turno.findById(req.params.id)
    res.status(200).json(turnoBuscado)
  } catch (error) {

    res.status(500).json({ mensaje: "Ocurrió un Error al obtener el turno." })
  }
}

const borrarTurno = async (req, res, _id) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) {
      return res.status(404).json({ mensaje: "No se encontro el turno" })
    }
    return res.status(200).json({ mensaje: `El turno ${turno} fue eliminado correctamente.` })
  } catch (error) {

    res.status(500).json({ mensaje: "Ocurrió un Error al borrar el turno." })
  }
}

const editarTurno = async (req, res, _id) => {
  try {
    const turnoActualizado = await Turno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!turnoActualizado) {
      return res.status(404).json({ mensaje: "No se encontró el turno" });
    }

    res.status(200).json(turnoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Ocurrió un error al editar el turno" });
  }
};

const cancelarTurno = async (req, res) => {
  try {
    const { estado } = req.body;

    const turnoCancelado = await Turno.findByIdAndUpdate(
      req.params.id,
      { estado: estado || "cancelado" },
      { new: true }
    );

    if (!turnoCancelado) {
      return res.status(404).json({ mensaje: "No se encontró el turno" });
    }

    res.status(200).json(turnoCancelado);

  } catch (error) {
    res.status(500).json({ mensaje: "Ocurrió un error al cancelar el turno" });
  }
};

const turnosPaginados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [turnos, cantidadTurnos] = await Promise.all([
      Turno.find().skip(skip).limit(limit).sort({ fecha: 1 }),
      Turno.countDocuments()
    ]);

    res.status(200).json({
      turnos,
      paginaActual: page,
      cantidadTurnos,
      cantPaginas: Math.ceil(cantidadTurnos / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al listar los turnos paginados" });
  }
};

export {
  crearTurno,
  obtenerTurnos,
  obtenerTurno,
  borrarTurno,
  editarTurno,
  turnosPaginados,
  cancelarTurno
}