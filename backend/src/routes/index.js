import { app } from '../common/app';
import { spotifyApi } from "../common/spotify";

const User = require("../db/mongo/models/user")

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/me', async (req, res, next) => {
  spotifyApi.getMe()
    .then(({ body }) => {
      res.send(body)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}); 

app.get('/getPlaylist', (req, res, next) => {
  spotifyApi.getUserPlaylists('nutkesh')
  .then(function(data) {
    res.send(data)
  },function(err) {
    res.status(err.body.error.status).send(err)
  });
})

app.get('/error', (req, res) => {
  res.send(req.query)
})

module.exports = app;
