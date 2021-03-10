let app = require('express')();
const SpotifyWebApi = require('spotify-web-api-node');

const STATE_KEY = 'spotify_auth_state';

const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

app.get('/login', (_, res) => {
  const state = generateRandomString(16);
  const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'streaming', 'user-read-currently-playing', 'user-read-playback-position', 'playlist-read-private', 'playlist-read-collaborative'];
  res.cookie(STATE_KEY, state);
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  
  res.redirect(authorizeURL);
});

app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect('http://localhost:5555/error?msg=state_mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      
      // saving access token and refresh token to the session
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;

      // we can also pass the token to the browser to make requests from there
      res.redirect(`http://localhost:5555/me`);
    }).catch(err => {
      res.redirect('http://localhost:5555/error?msg=invalid_token');
    });
  }
});


module.exports = {
  app,
  spotifyApi
};