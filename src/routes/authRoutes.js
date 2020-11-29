const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const mssql = require('../services/dbconnection');

const authRouter = express.Router();

function router() {
  authRouter.route('/signIn')
    .post(passport.authenticate('local'), {
      successRedirect: '/auth/home',
      failureRedirect: '/',
    });
  authRouter.route('/signUp')
    .post((req, res) => {
      // debug(req.body);
      // create user and login
      const user = JSON.parse(JSON.stringify(req.body));
      (function addUser() {
        try {
          mssql.dbConnectionPool.then(async (pool) => {
            const ps = new mssql.mssql.PreparedStatement(pool);
            // debug(`db conncetion established ${pool.connected}`);
            ps.input('firstname', mssql.mssql.VarChar(255));
            ps.input('lasttname', mssql.mssql.VarChar(255));
            ps.input('email', mssql.mssql.VarChar(255));
            ps.input('password', mssql.mssql.VarChar(255));
            ps.output('id', mssql.mssql.Int);
            await ps.prepare(`INSERT INTO [dbo].[Users]
            ([firstname],
              [lastname],
              [email],
              [password])
            VALUES (
              @firstname,
              @lastname,
              @email,
              @password
            )
          `, async (error) => {
              if (error) {
                debug(error);
              } else {
                const result = await ps.execute({
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  password: user.password
                });
                debug(result);
              }
            });
            // const request = pool.request();
            // const result = await request
            //   .input('firstname', user.firstname)
            //   .input('lastname', user.lastname)
            //   .input('email', user.email)
            //   .input('password', user.password)
            //   .output('id', mssql.Int)
            //   .query(`INSERT INTO [dbo].[Users]
            //     ([firstname],
            //       [lastname],
            //       [email],
            //       [password])
            //     VALUES (
            //       @firstname,
            //       @lastname,
            //       @email,
            //       @password
            //     )
            //   `);
            // // eslint-disable-next-line no-console
            // debug(result);
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`error persisting user ${error}`);
        }
      }());
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
      // res.send('user from server');
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
