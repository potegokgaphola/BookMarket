const express = require('express');

const startPageRouter = express.Router();

function router(nav) {
  startPageRouter.route('/home')
    .get((req, res) => {
      res.render('home',
        {
          nav
        });
    });

  startPageRouter.route('/about')
    .get((req, res) => {
      res.render('home',
        {
          nav
        });
    });

  startPageRouter.route('/privacy')
    .get((req, res) => {
      res.render('home',
        {
          nav
        });
    });
  return startPageRouter;
}

module.exports = router;
