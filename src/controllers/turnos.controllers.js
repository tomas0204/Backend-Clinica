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

export {
    crearTurno,
    obtenerTurnos
}