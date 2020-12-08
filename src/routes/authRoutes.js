const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const databaseService = require('../services/dbconnection');

const authRouter = express.Router();

function router() {
  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      successRedirect: '/auth/home',
      failureRedirect: '/',
    }));
  authRouter.route('/signUp')
    .post((req, res) => {
      const user = JSON.parse(JSON.stringify(req.body));
      (async function addUser() {
        try {
          const pool = await databaseService.dbConnectionPool;
          const request = pool.request();
          const result = await request
            .input('firstname', user.firstname)
            .input('lastname', user.lastname)
            .input('email', user.email)
            .input('password', user.password)
            .query(`INSERT INTO [dbo].[Users]
                ([firstname],
                  [lastname],
                  [email],
                  [password])
                  OUTPUT INSERTED.ID
                VALUES (
                  @firstname,
                  @lastname,
                  @email,
                  @password
                )
              `);
          user.id = result.recordset[0].ID;
          req.login(user, () => {
            res.redirect('/auth/home');
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`error persisting user ${error}`);
        }
      }());
    });

  authRouter.route('/profile')
    .all((req, res, next) => { // add this to any router you want proctect using .use()
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
