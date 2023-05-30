const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const isLoggedIn = require('../middleware/auth');


router.use('/api-docs', isLoggedIn, swaggerUi.serve);
router.get('/api-docs', isLoggedIn, swaggerUi.setup(swaggerDocument));

module.exports = router;