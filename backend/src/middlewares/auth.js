'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { redisJwtClient } = require('../db/redis/config');
const { ErrorHandler } = require('../lib/errors');

const isLoggedIn = async(req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      // jwt verify the token
      await verifyToken(token, req);
      console.log('decoded: ', req.decoded);
      // check if token is in blacklist, throws error if found in blacklist
      checkBlacklist(token, next);
    } else {
      throw new ErrorHandler(401, 'Token required');
    }
  } catch (err) {
    next(err);
  }
  next();
};

const checkBlacklist = (token, next) => {
  redisJwtClient.get(token, (err, reply) => {
    if (err) {
      next(new ErrorHandler(500, 'Something unexpected happened'));
    }
    if (reply) {
      next(new ErrorHandler(401, 'Token Blacklisted'));
    }
  });
};

const verifyToken = async(token, req) => {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      throw new ErrorHandler(401, 'Error verifying token');
    } else {
      req.decoded = decoded;
    }
  });
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
