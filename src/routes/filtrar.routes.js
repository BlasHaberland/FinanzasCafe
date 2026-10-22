const express = require('express');
const router = express.Router();
const { buscar } = require('../controllers/filtrar.controller');

router.get('/', buscar);

module.exports = router;