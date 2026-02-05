import Turno from "../models/turno.js"

const crearTurno = async (req, res) => {
  try {
    console.log("Se creó un turno");
    res.status(201).send("Se creó un turno");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear turno");
  }
};

export {
    crearTurno
}