'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { redisClient } = require('../db/redis/config');

const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      // do these need to have 'await' in front of them?
      // check if token is in blacklist, throws error if found in blacklist
      checkBlacklist(token);
      // jwt verify the token
      verifyToken(token);
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong'});
  }
};

const checkLogin = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/home');
  }
  next();
};


const checkBlacklist = async(token) => {
  try {
    // get blacklist
    const result = await redisClient.lrange('jwt-blacklist', 0, 99999999);
    // throw error if token is in blacklist
    if (result.indexOf(token) > -1) {
      throw new Error('Invalid Token');
    }
    // otherwise proceed
    return;
  } catch (err) {
    // fix this handler when we move to production
    throw new Error('Error at validateJwt');
  }
};

const verifyToken = async(token) => {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      throw new Error('Invalid Token');
    } else {
      return decoded;
    }
  });
};

module.exports = {
  isLoggedIn,
  checkLogin,
};
