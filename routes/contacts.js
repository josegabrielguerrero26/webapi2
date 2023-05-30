const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const isLoggedIn = require('../middleware/auth');
const contactsController = require('../controllers/contacts');

router.get('/', isLoggedIn, contactsController.getAll);

router.get('/:id',isLoggedIn, contactsController.getSingle);

router.post('/',isLoggedIn, validation.saveContact, contactsController.createContact);

router.put('/:id',isLoggedIn, validation.saveContact, contactsController.updateContact);

router.delete('/:id',isLoggedIn, contactsController.deleteContact);

module.exports = router;