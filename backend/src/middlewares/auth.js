'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { redisJwtClient } = require('../db/redis/config');
const { createTokens } = require('../lib/auth');
const { ErrorHandler } = require('../lib/errors');

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;


const isLoggedIn = async(req, res, next) => {
  const accessToken = req.headers['v-at'];
  const refreshToken = req.headers['v-rt'];

  try {
    if (accessToken && refreshToken) {
      // jwt verify the access token
      const isAccessTokenValidated = await verifyToken(
        accessToken, 'access', req,
      );
      if (isAccessTokenValidated) {
        // if valid access token, check whitelist and send to next or error
        const isWhiteListed = await checkWhitelist(accessToken, refreshToken);
        if (isWhiteListed) {
          next();
        } else {
          throw new ErrorHandler(403, 'Non-whitelisted token');
        }
      } else if (!isAccessTokenValidated) {
        // if invalid access token, try to validate refresh token
        const isRefreshTokenValidated = await verifyToken(
          refreshToken, 'refresh', req,
        );

        if (isRefreshTokenValidated) {
          // if valid refresh, check whitelist to validate token pair
          const isWhiteListed = await checkWhitelist(accessToken, refreshToken);

          if (isWhiteListed) {
            // if whitelisted, generate new set of tokens and set to headers
            const [
              refreshedAccessToken,
              refreshedRefreshToken,
            ] = await refreshTokens(accessToken, {
              email: isRefreshTokenValidated.email,
              id: isRefreshTokenValidated.subject,
            });
            req.headers['v-at'] = refreshedAccessToken;
            req.headers['v-rt'] = refreshedRefreshToken;

          } else {
            throw new ErrorHandler(403, 'Mismatched/Non-whitelisted tokens');
          }
        } else {
          throw new ErrorHandler(403, 'Invalid tokens');
        }
      }
      next();
    } else {
      throw new ErrorHandler(401, 'Tokens required');
    }
  } catch (err) {
    next(err);
  }
  next();
};

const refreshTokens = async(accessToken, userInfo) => {
  const delAsync = promisify(redisJwtClient.del).bind(redisJwtClient);
  console.log(await delAsync(accessToken));
  return await createTokens(userInfo);
};

const checkWhitelist = async(accessToken, refreshToken) => {
  const getAsync = promisify(redisJwtClient.get).bind(redisJwtClient);

  const res = await getAsync(accessToken);
  if (res === refreshToken) {
    console.log(res);
    return true;
  } else {
    return false;
  }
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
