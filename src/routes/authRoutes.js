const express = require('express');
// const mssql = require('mssql');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      res.send('user from server');
    });

  return authRouter;
}

module.exports = router;
