const express = require('express');
const router = express.Router();
const { mostrar } = require('../controllers/dashboard.controller');
router.get('/', mostrar);
module.exports = router;