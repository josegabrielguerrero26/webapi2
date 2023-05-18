const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));
router.use('/veh', require('./veh'));

router.use('/', require('./swagger'));

module.exports = router;