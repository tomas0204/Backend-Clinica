import Turno from "../models/turno.js"

const crearTurno = async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body)

    await nuevoTurno.save()

    console.log("Se creó un turno");
    res.status(201).send("Se creó un turno");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear turno");
  }
};

const obtenerTurnos = async(req, res) =>{
    try {
        const turnos = await Turno.find()
        res.status(200).json(turnos)
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrió un Error al listar los turnos."})
    }
}

const obtenerTurno = async(req, res, _id) =>{
    try {
        const turnoBuscado = await Turno.findById(req.params.id)
        res.status(200).json(turnoBuscado)
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrió un Error al obtener el turno."})
    }
}

const borrarTurno = async(req, res, _id) =>{
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
        if(!turno) {
            return res.status(404).json({mensaje: "No se encontro el turno"})
        }
        return res.status(200).json({mensaje: `El turno ${turno} fue eliminado correctamente.`})
  } catch (error) {
    console.error(error);
    res.status(500).json({mensaje: "Ocurrió un Error al borrar el turno."})
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

    res.status(200).json({
      mensaje: "Turno actualizado correctamente",
      turno: turnoActualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error al editar el turno" });
  }
};

export {
    crearTurno,
    obtenerTurnos,
    obtenerTurno,
    borrarTurno,
    editarTurno
}