const express = require('express');
const debug = require('debug')('app:startPage');
const databaseService = require('../services/dbconnection');

const startPageRouter = express.Router();

function router(nav) {
  startPageRouter.route('/home')
    .get(async (req, res) => {
      try {
        const pool = await databaseService.dbConnectionPool;
        const request = pool.request();
        const result = await request.query('select * from Users');
        debug(`Users ${result}`);
        res.render('home',
          {
            nav
          });
      } catch (error) {
        debug(`error getting users ${err}`);
      }
    });

  startPageRouter.route('/about')
    .get((req, res) => {
      (async () => {
        const request = new mssql.Request();
        const result = await request.query('select * from Users');
        debug(result);
        res.render('about',
          {
            nav
          });
      })();
    });

  startPageRouter.route('/privacy')
    .get((req, res) => {
      res.render('privacy',
        {
          nav
        });
    });
  return startPageRouter;
}

module.exports = router;
