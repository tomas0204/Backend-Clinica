import bcrypt from "bcrypt";
import Usuario from "../models/usuario.js";

export const crearUsuario = async (req, res) => {
  try {
    const saltos = bcrypt.genSaltSync(10);
    const passwordEncriptado = bcrypt.hashSync(req.body.password, saltos);
    req.body.password = passwordEncriptado;
    // Creamos usuarioNuevo y lo guardamos
    const usuarioNuevo = new Usuario(req.body);
    await usuarioNuevo.save();
    res.status(201).json({ mensaje: "Usuario creado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error, no se pudo crear el usuario." });
  }
};