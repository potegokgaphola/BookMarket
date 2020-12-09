function bookController() {
  function getIndex(req, res) {

  }

  function getById() {

  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return { getIndex, getById, middleware };
}

module.exports = bookController;
