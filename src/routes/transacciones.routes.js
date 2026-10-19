const express = require('express');
const router = express.Router();
const { crear } = require('../controllers/transacciones.controller');

router.post('/', crear);
module.exports = router;