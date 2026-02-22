import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // Verificar que el header exista y tenga el formato correcto
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                mensaje: "Token no proporcionado o formato inválido"
            });
        }

        const token = authHeader.split(" ")[1];

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar la información del usuario al request para usarla en los controladores
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });
    }
}

export default validarToken;