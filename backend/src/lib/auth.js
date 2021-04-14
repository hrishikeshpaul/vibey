'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

/**
 * Generates a JWWT token
 * @param {object} user user object
 */
const createTokens = async(user) => {
  const { email, id } = user;
  const payload = {
    subject: id,
    email: email,
    role: 'user',
  };
  const accessOptions = {
    issuer: 'vibey',
    expiresIn: '1h',
  };
  const refreshOptions = {
    issuer: 'vibey',
    expiresIn: '7d',
  };
  const createToken = jwt.sign(payload, jwtSecret, accessOptions);
  const createRefreshToken = jwt.sign(
    payload,
    jwtRefreshSecret,
    refreshOptions,
  );
  return Promise.all([createToken, createRefreshToken]);
};

module.exports = {
  createTokens,
};
