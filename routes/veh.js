const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const vehController = require('../controllers/veh');
const isLoggedIn = require('../middleware/auth.js');

router.get('/',isLoggedIn, vehController.getAll);

router.get('/:id',isLoggedIn, vehController.getSingle);

router.post('/',isLoggedIn, validation.saveVeh,vehController.createveh);

router.put('/:id',isLoggedIn, validation.saveVeh,vehController.updateveh);

router.delete('/:id',isLoggedIn, vehController.deleteveh);

module.exports = router;