import Paciente from "../models/paciente.js";


export const prueba = (req, res) => {
    console.log('desde el controlador de prueba');
    res.send('Prueba desde el controlador');
}

export const crearPaciente = async (req, res) => {
  try {
    const { contraseña, contraseña_confirmar } = req.body;
    

    // ✅ Validar que las contraseñas coincidan
    if (contraseña !== contraseña_confirmar) {
      return res.status(400).json({
        mensaje: "Las contraseñas no coinciden"
      });
    }

    // ✅ Eliminar contraseña_confirmar antes de guardar
    delete req.body.contraseña_confirmar;

    // 🔥 FORZAR ROL
    req.body.role = "paciente";

    const pacienteNuevo = new Paciente(req.body);

    await pacienteNuevo.save();

    res.status(201).json({
      mensaje: "El paciente fue creado exitosamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al crear paciente"
    });
  }
};

export const listarPacientes = async (req, res) => {
        try {
            const pacientes = await Paciente.find();
            res.status(200).json(pacientes) 
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: "Ocurrio un error al listar los pacientes" })
        }
    }

export const obtenerPaciente = async (req, res) => {
    try {

        console.log(req.params.id);
        const pacienteBuscado = await Paciente.findById(req.params.id);
        if(!pacienteBuscado){
            //404 not found 
            return res.status(404).json({mensaje:'No se encontro el paciente'})
        }
        res.status(200).json(pacienteBuscado)

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Ocurrio un error al listar el paciente'})
    }
}


export const borrarPacientePorID = async (req, res) => {
  try {

    // 1️⃣ Buscar primero
    const pacienteBuscado = await Paciente.findById(req.params.id);

    if (!pacienteBuscado) {
      return res.status(404).json({ mensaje: "No se encontró el paciente" });
    }

    // 2️⃣ Si es admin, validar antes de borrar
    if (pacienteBuscado.role === "admin") {

      const cantidadAdmins = await Paciente.countDocuments({ role: "admin" });

      if (cantidadAdmins <= 1) {
        return res.status(400).json({
          mensaje: "No se puede eliminar al último administrador"
        });
      }
    }

    // 3️⃣ Ahora sí eliminar
    await Paciente.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al eliminar usuario"
    });
  }
};

export const editarPacientePorID = async (req, res) => {
    try {
        const pacienteBuscado = await Paciente.findByIdAndUpdate(req.params.id, req.body);
        if(!pacienteBuscado){
            return res.status(404).json({mensaje: "No se encontro el paciente"})
        }
        return res.status(200).json({mensaje: "El paciente fue actualizado correctamente"})

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al actualizar paciente"})

    }
}

