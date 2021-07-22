'use strict';

const { app } = require('../lib/app');
const { generateRandomString, scopes, STATE_KEY } = require('../static/const');
const { spotifyApi } = require('../lib/spotify');
const { User } = require('../db/mongo/models/user');
const { createTokens } = require('../lib/auth');
const { redisJwtClient } = require('../db/redis/config');

/**
 * If user isn't active in Redis, get authorization code from Spotify by
 * using the Client ID and Secret
 * Redirects to call back which then gets the access token and refresh token
 */
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.send(spotifyApi.createAuthorizeURL(scopes, state, true));
});

/**
 * Requests Spotify for access token and refresh token
 * Sets the session and the user in the database
 * Returns the new user or an error
 */
app.get('/authorize', async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect('http://localhost:5555/error?msg=state_mismatch');
  } else {
    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token } = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      const user = await spotifyApi.getMe();
      const userObj = {
        display_name: user.body.display_name,
        email: user.body.email,
        href: user.body.href,
        uri: user.body.uri,
        image: user.body.images.length > 0 ? user.body.images[0].url : null,
        username: user.body.id,
      };

      let loggedUser = await User.findOne({ email: userObj.email });
      if (!loggedUser) {
        loggedUser = await new User(userObj).save();
      }

      const [accessToken, refreshToken] = await createTokens(loggedUser);

      res.status(200).json({
        user: loggedUser,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

/**
 * Adds the user's AT and RT to blacklist
 * wipes the spotify access and refresh token
 * sends 204 no response on success
 */
app.post('/logout', function (req, res) {
  const accessToken = req.headers['v-at'];

  if (accessToken) {
    try {
      redisJwtClient.del(accessToken);
    } catch (err) {
      console.log(err);
    }
  }
  spotifyApi.setAccessToken('');
  spotifyApi.setRefreshToken('');
  res.status(204).send();
});

module.exports = app;
