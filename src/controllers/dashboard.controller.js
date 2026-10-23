const db = require('../config/db')
const mostrar = async (req, res) => {
    try {
        const [categorias] = await db.query('SELECT * FROM categoria WHERE activa = 1');
        const [metodos] = await db.query('SELECT * FROM metodo_pago');

        const [totalIngresos] = await db.query(`
      SELECT COALESCE(SUM(monto), 0) AS total
      FROM transaccion
      WHERE tipo = 'ingreso' AND activo = 1
        AND MONTH(fecha) = MONTH(CURDATE())
        AND YEAR(fecha) = YEAR(CURDATE())
    `);
        const [totalEgresos] = await db.query(`
      SELECT COALESCE(SUM(monto), 0) AS total
      FROM transaccion
      WHERE tipo = 'egreso' AND activo = 1
        AND MONTH(fecha) = MONTH(CURDATE())
        AND YEAR(fecha) = YEAR(CURDATE())
    `);
        const [listaIngresos] = await db.query(`
            SELECT id_transaccion, monto, fecha, descripcion 
            FROM transaccion 
            WHERE tipo = 'ingreso' AND activo = 1
            AND MONTH(fecha) = MONTH(CURDATE())
            AND YEAR(fecha) = YEAR(CURDATE())
            ORDER BY fecha DESC
            `);
        const [listaEgresos] = await db.query(`
            SELECT id_transaccion, monto, fecha, descripcion 
            FROM transaccion 
            WHERE tipo = 'egreso' AND activo = 1
            AND MONTH(fecha) = MONTH(CURDATE())
            AND YEAR(fecha) = YEAR(CURDATE())
            ORDER BY fecha DESC
            `);

        res.render('dashboard/index', {
            title: 'Dashboard',
            categorias,
            metodos,
            totalIngresos: totalIngresos[0].total,
            totalEgresos: totalEgresos[0].total,
            listaEgresos: listaEgresos,
            listaIngresos: listaIngresos

        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el dashboard');
    }

}
module.exports = { mostrar };