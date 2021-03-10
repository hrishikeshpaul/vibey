
import { generateRandomString, scopes, STATE_KEY } from "../static/const";
import { initSpotifyApi } from "../common/spotify";

const app = require('express')();
const spotifyApi = new initSpotifyApi();

app.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  
  res.redirect(authorizeURL);
});

app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect('http://localhost:5555/error?msg=state_mismatch');
  } else {
    res.clearCookie(STATE_KEY);
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;

      // we can also pass the token to the browser to make requests from there
      res.redirect(`http://localhost:5555/me`);
    }).catch(err => {
      res.send(err)
    });
  }
});


export default {
  app,
  spotifyApi
};