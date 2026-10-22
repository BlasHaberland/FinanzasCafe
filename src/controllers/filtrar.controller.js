const db = require('../config/db');

const buscar = async (req, res) => {
    try {
        const { tipo, fecha_desde, fecha_hasta, id_categoria } = req.query;

        let query = `
      SELECT t.id_transaccion, t.tipo, t.monto, t.fecha, t.descripcion,
             c.nombre AS categoria, m.nombre AS metodo
      FROM transaccion t
      LEFT JOIN categoria c ON t.id_categoria = c.id_categoria
      LEFT JOIN metodo_pago m ON t.id_metodo = m.id_metodo
      WHERE 1=1
    `;
        const params = [];

        if (tipo) { query += ` AND t.tipo = ?`; params.push(tipo); }
        if (fecha_desde) { query += ` AND t.fecha >= ?`; params.push(fecha_desde); }
        if (fecha_hasta) { query += ` AND t.fecha <= ?`; params.push(fecha_hasta + ' 23:59:59'); }
        if (id_categoria) { query += ` AND t.id_categoria = ?`; params.push(id_categoria); }

        query += ` ORDER BY t.fecha DESC`;

        const [transacciones] = await db.query(query, params);

        // 3. Traer categorías para el select del formulario
        const [categorias] = await db.query('SELECT * FROM categoria WHERE activa = 1');

        res.render('filtrar/index', {
            title: 'Filtrar',
            transacciones,
            categorias,
            filtros: req.query, // para mantener los valores seleccionados en el form
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al filtrar transacciones');
    }
};

module.exports = { buscar };