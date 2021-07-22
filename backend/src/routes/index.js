'use strict';

const { app } = require('../lib/app');
const { spotifyApi } = require('../lib/spotify');
const { isLoggedIn } = require('../middlewares/auth');

app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/me', isLoggedIn, async (req, res, next) => {
  spotifyApi
    .getMe()
    .then(({ body }) => {
      res.send(body);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.get('/getPlaylist', (req, res, next) => {
  spotifyApi.getUserPlaylists('nutkesh').then(
    function (data) {
      res.send(data);
    },
    function (err) {
      res.status(err.body.error.status).send(err);
    },
  );
});

app.get('/error', (req, res) => {
  res.send(req.query);
});

module.exports = app;
