'use strict';

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const setSession = (req, accessToken, refreshToken, user) => {
  req.session.access_token = accessToken;
  req.session.refresh_token = refreshToken;
  req.session.user = user;
};

/**
 * Generates a JWWT token
 * @param {object} user user object
 */

const generateToken = (user) => {
  const { email, id } = user;
  const payload = {
    subject: id,
    email: email,
    role: 'user',
  };

  const options = {
    issuer: 'vibey',
    expiresIn: '1h',
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = {
  setSession,
  generateToken,
};
