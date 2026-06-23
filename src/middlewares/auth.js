const jwt = require('jsonwebtoken');

const verificarAdmin = (req, res, next) => {
    // 1. El guardia mira si traés la cookie
    const token = req.cookies.token_admin;

    // Si no hay cookie, te rebota automáticamente
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Se requiere iniciar sesión.' });
    }

    try {
        // 2. El guardia revisa que la firma del token no sea falsa ni esté vencida
        // (Asegurate de usar exactamente la misma frase secreta que pusiste en el login)
        const decodificado = jwt.verify(token, 'CLAVE_SECRETA_PETSHOP');
        
        // 3. Si todo está bien, guarda los datos del admin y te deja pasar a la ruta final
        req.admin = decodificado; 
        next(); 

    } catch (error) {
        // Si el token es falso o expiraron las 2 horas
        return res.status(401).json({ error: 'Sesión inválida o expirada. Volvé a ingresar.' });
    }
};

module.exports = verificarAdmin;