'use strict';

const {
  refreshTokens,
  checkWhitelist,
  verifyToken,
} = require('../lib/auth');
const { ErrorHandler } = require('../lib/errors');

/**
 * isLoggedIn: Auth/refresh token flow
 * tries to validate access token with jwt.verify and whitelist
 * if fail, tries to verify refresh with jwt.verify and whitelist,
 *   tries to refresh tokens or throw error accordingly
 */
const isLoggedIn = async(req, res, next) => {
  const accessToken = req.headers['v-at'];
  const refreshToken = req.headers['v-rt'];

  try {
    if (accessToken && refreshToken) {
      const isAccessTokenValidated = await verifyToken(
        accessToken, 'access', req,
      );

      if (isAccessTokenValidated) {
        const isWhiteListed = await checkWhitelist(accessToken, refreshToken);
        if (isWhiteListed) {
          return next();
        } else {
          throw new ErrorHandler(403, 'Non-whitelisted token');
        }
      } else if (!isAccessTokenValidated) {
        const isRefreshTokenValidated = await verifyToken(
          refreshToken, 'refresh', req,
        );

        if (isRefreshTokenValidated) {
          const isWhiteListed = await checkWhitelist(accessToken, refreshToken);

          if (isWhiteListed) {
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
      return next();
    } else {
      throw new ErrorHandler(401, 'Tokens required');
    }
  } catch (err) {
    next(err);
  }
  return next();
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
