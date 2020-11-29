const passport = require('passport');
require('./strategy/local.strategy')();

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // store user in session
  passport.serializeUser((user, done) => {
    done(null, user); // might want to store user.id
  });

  // retrieve user from session
  passport.deserializeUser((user, done) => {
    // get user from db..
    done(null, user);
  });
}

module.exports = passportConfig;
