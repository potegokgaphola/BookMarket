const express = require('express');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router() {
  const { getIndex, getById, middleware } = bookController();
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

module.exports = router;
