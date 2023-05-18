const express = require('express');
const router = express.Router();

const vehController = require('../controllers/veh');

router.get('/', vehController.getAll);

router.get('/:id', vehController.getSingle);

router.post('/', vehController.createveh);

router.put('/:id', vehController.updateveh);

router.delete('/:id', vehController.deleteveh);

module.exports = router;