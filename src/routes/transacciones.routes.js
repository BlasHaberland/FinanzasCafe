const express = require('express');
const router = express.Router();
const { crear, eliminar } = require('../controllers/transacciones.controller');

router.post('/', crear);
router.delete('/:id', eliminar);
module.exports = router;