import { Router } from 'express';
import { crearHistorial, obtenerHistorialPorPaciente } from './controllers/historial.controller.js';

const historialRoutes = Router();

router.use("/crear", crearHistorial);

export default routes;
