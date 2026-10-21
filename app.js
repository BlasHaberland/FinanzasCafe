const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();

// ── Motor de vistas ────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// ── Archivos estáticos (CSS, JS, imágenes) ─────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Middlewares globales ───────────────────────────
app.use(express.urlencoded({ extended: true })); // leer datos de formularios
app.use(express.json());                          // leer datos en formato JSON
app.use(methodOverride('_method'));               // soportar PUT y DELETE

// ── Sesiones ──────────────────────────────────────
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// ── Rutas ──────────

app.use('/', require('./src/routes/dashboard.routes'));
app.use('/transacciones', require('./src/routes/transacciones.routes'));
app.use('/estadisticas', require('./src/routes/estadisticas.routes'));
// ── Ruta prueba ────────────────────────────────
/*app.get('/', (req, res) => {
    res.render('dashboard/index', { title: 'Inicio' });
});*/

// ── Iniciar servidor ──────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});