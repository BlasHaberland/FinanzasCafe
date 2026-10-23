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

const eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(
            'UPDATE transaccion SET activo = 0 WHERE id_transaccion = ?',
            [id]
        );

        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.redirect('/?error=error_eliminar');
    }
};

module.exports = { crear, eliminar };