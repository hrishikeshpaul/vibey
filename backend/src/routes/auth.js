import { generateRandomString, scopes, STATE_KEY } from "../static/const";
import { spotifyApi } from "../common/spotify";
const User = require("../db/mongo/models/user");
import { app } from "../common/app";
import { setSession } from "../common/auth";

/**
 * If user isn't active in Redis, get authorization code from Spotify by
 * using the Client ID and Secret
 *
 * Redirects to call back which then gets the access token and refresh token
 *
 *
 */
app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  if (!req.session.user) {
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state, true));
  } else {
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
  }
});

/**
 * Requests Spotify for access token and refresh token
 * Sets the session and the user in the database
 * Returns the new user or an error
 */
app.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect("http://localhost:5555/error?msg=state_mismatch");
  } else {
    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token } = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;

      const user = await spotifyApi.getMe();
      const userObj = {
        display_name: user.body.display_name,
        email: user.body.email,
        href: user.body.href,
        uri: user.body.uri,
        image: user.body.images.length > 0 ? user.body.images[0].url : null,
      };

      let loggedUser = await User.findOne({ email: userObj.email });
      if (!loggedUser) {
        loggedUser = await new User(userObj).save();
      }
      setSession(req, access_token, refresh_token, loggedUser.id);
      res.send(loggedUser);
    } catch (err) {
      res.send(err);
    }
  }
});

/**
 * Destroys the current session
 * TODO: reset spotifyApi state
 * Redirects to home page, where a new session is created (new session lacks tokens)
 *
 */
app.get("/logout", async (req, res) => {
  req.session.destroy(function () {
    res.redirect("http://localhost:5555/");
  });
});

module.exports = app;
