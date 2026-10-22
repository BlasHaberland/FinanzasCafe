const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const { isAuthenticated } = require('./src/middlewares/auth.middleware');
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
app.use('/', require('./src/routes/auth.routes'));
app.use('/', isAuthenticated, require('./src/routes/dashboard.routes'));
app.use('/transacciones', isAuthenticated, require('./src/routes/transacciones.routes'));
app.use('/estadisticas', isAuthenticated, require('./src/routes/estadisticas.routes'));
app.use('/filtrar', isAuthenticated, require('./src/routes/filtrar.routes'))

// ── Ruta prueba ────────────────────────────────
/*app.get('/', (req, res) => {
    res.render('dashboard/index', { title: 'Inicio' });
});*/

// ── Iniciar servidor ──────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});