'use strict';

const jwt = require('jsonwebtoken');

const { redisJwtClient } = require('../db/redis/config');
const { getAsyncJwtClient, delAsyncJwtClient } = require('../lib/redis');
const { ErrorHandler } = require('../lib/errors');

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;


/**
 * Generates a JWWT token
 * @param {object} user user object
 */
const createTokens = async(user) => {
  if (!user) {
    throw new ErrorHandler(400, 'Cannot create tokens without user info');
  }
  const { email, id } = user;
  const payload = {
    subject: id,
    email: email,
    role: 'user',
  };
  const accessOptions = {
    issuer: 'vibey',
    expiresIn: '15m',
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

  // creates tokens and stores them in redis as a pair (whitelist)
  const [accessToken, refreshToken] = await Promise.all([
    createToken, createRefreshToken,
  ]);
  redisJwtClient.set(accessToken, refreshToken);
  return [accessToken, refreshToken];
};

const refreshTokens = async(accessToken, userInfo) => {
  await delAsyncJwtClient(accessToken);
  return await createTokens(userInfo);
};

const checkWhitelist = async(accessToken, refreshToken) => {
  const res = await getAsyncJwtClient(accessToken);
  if (res === refreshToken) {
    return true;
  } else {
    return false;
  };
};

const verifyToken = async(token, type, req) => {
  let secret;
  if (type === 'access') { secret = jwtSecret; };
  if (type === 'refresh') { secret = jwtRefreshSecret; };

  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = {
  createTokens,
  refreshTokens,
  checkWhitelist,
  verifyToken,
};
