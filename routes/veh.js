const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const vehController = require('../controllers/veh');

router.get('/', vehController.getAll);

router.get('/:id', vehController.getSingle);

router.post('/', validation.saveVeh,vehController.createveh);

router.put('/:id', validation.saveVeh,vehController.updateveh);

router.delete('/:id', vehController.deleteveh);

module.exports = router;