'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

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
  generateToken,
};
