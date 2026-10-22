require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../src/config/db');

const nombre = process.env.ADMIN_NOMBRE;
const password = process.env.ADMIN_PASSWORD;
const email = process.env.ADMIN_EMAIL;

async function crearUsuario() {
    try {
        const hash = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO usuario (nombre, email, password_hash, rol) VALUES (?, ?, ?, 'Admin')",
            [nombre, email, hash]
        );

        console.log('✅ Usuario creado exitosamente');
        console.log('   Nombre:', nombre);
        console.log('   Email:', email);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

crearUsuario();