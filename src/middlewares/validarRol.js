export const validarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
       
        if (!req.user){
            return res.status(500).json({
                mensaje: "Se quiere verificar el rol sin validar el token primero"
            })
        }

        if (!rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({
                mensaje: `El rol ${req.user.role} no tiene permiso para esta acción`
            });
        }
    }
}