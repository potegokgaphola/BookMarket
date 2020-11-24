const express = require('express');
const mssql = require('mssql');
const debug = require('debug')('app:startPage');

const startPageRouter = express.Router();

function router(nav) {
  startPageRouter.route('/home')
    .get((req, res) => {
      const request = new mssql.Request();
      request.query('select * from Users')
        .then((result) => {
          debug(result);
          console.info(`Users ${result}`);
        })
        .catch((err) => console.error(`error getting users ${err}`));
      res.render('home',
        {
          nav
        });
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
