const express = require('express');
const router = express.Router();
const { mostrarLogin, login, logout } = require('../controllers/auth.controller');

router.get('/login', mostrarLogin);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;