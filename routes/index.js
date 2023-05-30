const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/auth.js');
const passport = require('passport');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
  }); // Main Page 

router.get('/auth',passport.authenticate('github',{ scope: [ 'user:email' ] }));// get authenticated by 
router.get('/auth/error', (req, res) => res.send('Unknown Error'));// if error

//return callback route
router.get('/oauth-callback',passport.authenticate('github', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/api-docs');
});

router.use('/contacts',isLoggedIn, require('./contacts'));
router.use('/veh',isLoggedIn, require('./veh'));

router.use('/', isLoggedIn,require('./swagger'));

module.exports = router;