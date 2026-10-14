const db = require('../config/db')
const mostrar = async (req, res) => {
    try {
        const [categorias] = await db.query('SELECT * FROM categoria WHERE activa = 1');
        const [metodos] = await db.query('SELECT * FROM metodo_pago');

        const [totalIngresos] = await db.query(`
      SELECT COALESCE(SUM(monto), 0) AS total
      FROM transaccion
      WHERE tipo = 'ingreso'
        AND MONTH(fecha) = MONTH(CURDATE())
        AND YEAR(fecha) = YEAR(CURDATE())
    `);
        const [totalEgresos] = await db.query(`
      SELECT COALESCE(SUM(monto), 0) AS total
      FROM transaccion
      WHERE tipo = 'egreso'
        AND MONTH(fecha) = MONTH(CURDATE())
        AND YEAR(fecha) = YEAR(CURDATE())
    `);

        res.render('dashboard/index', {
            title: 'Dashboard',
            categorias,
            metodos,
            totalIngresos: totalIngresos[0].total,
            totalEgresos: totalEgresos[0].total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el dashboard');
    }

}
module.exports = { mostrar };