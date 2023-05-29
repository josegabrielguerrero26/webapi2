const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const express = require('express');
const routes = require('./routes');
const passport = require('passport');
const cookieSession = require('cookie-session')

require('./helper/passport')
const app = express();
const port = process.env.PORT || 8080;

app.use(cookieSession({
  name: 'github-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });


mongodb.initDb((err,mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
