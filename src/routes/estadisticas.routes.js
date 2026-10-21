const express = require('express');
const router = express.Router();
const { mostrar } = require('../controllers/estadisticas.controller');

router.get('/', mostrar);

module.exports = router;