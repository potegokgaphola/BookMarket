const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const databaseService = require('../../services/dbconnection');

function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'login-username',
    passwordField: 'login-password',
  }, async (username, password, done) => {
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
    try {
      const pool = await databaseService.dbConnectionPool;
      const request = pool.request();
      const results = await request
        .input('email', user.username)
        .query('SELECT * FROM [dbo].[Users] WHERE [email]=@email');
      debug(results);
    } catch (error) {
      debug(error);
    }
    done(null, user);
  }));
}

module.exports = localStrategy;
