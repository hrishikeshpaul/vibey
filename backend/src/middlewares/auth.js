'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
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
