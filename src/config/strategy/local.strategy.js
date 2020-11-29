const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const database = require('../../services/dbconnection');

function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'login-username',
    passwordField: 'login-password',
  }, (username, password, done) => {
    // go to db and validate user
    const user = {
      username,
      password,
    };
    database.dbConnectionPool.then((pool) => {
      // const
      /**
       * search user using username and validate password
       * pass null and user to done on match
       * pass null and false to done else
       */
    });
    done(null, user);
  }));
}

module.exports = localStrategy;
