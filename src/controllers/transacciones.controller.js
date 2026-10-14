const db = require('../config/db');
const crear = async (req, res) => {
    try {
        const { tipo, monto, fecha, descripcion, id_categoria, id_metodo } = req.body;

        if (!tipo || !monto || !fecha || !id_categoria || !id_metodo) {
            return res.redirect('/?error=campos_requeridos');
        }

        await db.query(`INSERT INTO transaccion (tipo, monto, fecha, descripcion, id_categoria, id_metodo)
       VALUES (?, ?, ?, ?, ?, ?)`, [
            tipo,
            parseFloat(monto),
            fecha,
            descripcion || null,
            id_categoria,
            id_metodo,
        ]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/?error=error_servidor');
    }
};
module.exports = { crear };