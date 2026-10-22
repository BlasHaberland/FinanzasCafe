const db = require('../config/db');
const bcrypt = require('bcrypt');

const mostrarLogin = (req, res) => {
    if (req.session.usuario) return res.redirect('/');
    res.render('auth/login', { title: 'Iniciar sesión', error: null });
};

const login = async (req, res) => {
    try {
        const { nombre, password } = req.body;


        const [rows] = await db.query(
            'SELECT * FROM usuario WHERE nombre = ?',
            [nombre]
        );

        if (rows.length === 0) {
            return res.render('auth/login', {
                title: 'Iniciar sesión',
                error: 'Usuario o contraseña incorrectos',
            });
        }

        const usuario = rows[0];

        const passwordValida = await bcrypt.compare(password, usuario.password_hash);

        if (!passwordValida) {
            return res.render('auth/login', {
                title: 'Iniciar sesión',
                error: 'Usuario o contraseña incorrectos',
            });
        }
        req.session.usuario = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
        };

        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.render('auth/login', { title: 'Iniciar sesión', error: 'Error del servidor' });
    }
};

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

module.exports = { mostrarLogin, login, logout };