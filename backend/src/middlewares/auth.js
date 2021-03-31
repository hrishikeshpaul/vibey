'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

const checkLogin = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/home');
  }
  next();
};

module.exports = {
  isLoggedIn,
  checkLogin,
};
