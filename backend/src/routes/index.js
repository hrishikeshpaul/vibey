const express = require('express');
const router = express.Router();

const spotifyApi = require('./auth').default.spotifyApi;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', async (req, res, next) => {
  spotifyApi.setAccessToken(req.session.access_token);
  spotifyApi.setRefreshToken(req.session.refresh_token);
  spotifyApi.getMe()
    .then(({ body }) => {
      res.send(body)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}); 

router.get('/getPlaylist', (req, res, next) => {
  spotifyApi.getUserPlaylists('nutkesh')
  .then(function(data) {
    res.send(data)
  },function(err) {
    res.status(err.body.error.status).send(err)
  });
})

router.get('/error', (req, res) => {
  res.send(req.query)
})

module.exports = router;
