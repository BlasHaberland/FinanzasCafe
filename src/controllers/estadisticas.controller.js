const db = require('../config/db');

const mostrar = async (req, res) => {
  try {

    // Ingresos agrupados por categoría
    const [ingresosPorCategoria] = await db.query(`
      SELECT c.nombre, SUM(t.monto) AS total
      FROM transaccion t
      JOIN categoria c ON t.id_categoria = c.id_categoria
      WHERE t.tipo = 'ingreso' AND t.activo = 1
        AND MONTH(t.fecha) = MONTH(CURDATE())
        AND YEAR(t.fecha) = YEAR(CURDATE())
      GROUP BY c.nombre
    `);

    // Egresos agrupados por categoría
    const [egresosPorCategoria] = await db.query(`
      SELECT c.nombre, SUM(t.monto) AS total
      FROM transaccion t
      JOIN categoria c ON t.id_categoria = c.id_categoria
      WHERE t.tipo = 'egreso' AND t.activo = 1
        AND MONTH(t.fecha) = MONTH(CURDATE())
        AND YEAR(t.fecha) = YEAR(CURDATE())
      GROUP BY c.nombre
    `);

    // Totales para la torta
    const [totales] = await db.query(`
      SELECT tipo, SUM(monto) AS total
      FROM transaccion
      WHERE activo = 1
        AND MONTH(fecha) = MONTH(CURDATE())
        AND YEAR(fecha) = YEAR(CURDATE())
      GROUP BY tipo
    `);

    res.render('estadisticas/index', {
      title: 'Estadísticas',
      ingresosPorCategoria,
      egresosPorCategoria,
      totales,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar las estadísticas');
  }
};

module.exports = { mostrar };