<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const spotifyApi = require("./auth").default.spotifyApi;

router.get("/", function (req, res, next) {
  console.log("req session: ", req.session);
  res.render("index", { title: "Express" });
});

router.get("/me", async (req, res, next) => {
  spotifyApi.setAccessToken(req.session.access_token);
  spotifyApi.setRefreshToken(req.session.refresh_token);
  spotifyApi
    .getMe()
=======
import { app } from '../common/app';
import { spotifyApi } from "../common/spotify";
import { isLoggedIn } from "../middlewares/auth";

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/me',  isLoggedIn, async (req, res, next) => {
  spotifyApi.getMe()
>>>>>>> 74d621cb606deac111f443e2e66c6b207af4f6a0
    .then(({ body }) => {
      res.send(body);
    })
    .catch((error) => {
<<<<<<< HEAD
      console.log(error);
      res.send(error);
    });
});

router.get("/getPlaylist", (req, res, next) => {
  spotifyApi.getUserPlaylists("nutkesh").then(
    function (data) {
      res.send(data);
    },
    function (err) {
      res.status(err.body.error.status).send(err);
    }
  );
});

const User = require("../db/mongo/models/user");
router.get("/hi", (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
=======
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
>>>>>>> 74d621cb606deac111f443e2e66c6b207af4f6a0
  });
});

router.get("/test-session", async (req, res) => {
  if (!req.session.access_token) {
    if (!req.session.user) {
      res.send("doesnt contain token or user");
    } else {
      res.send("session doesn't contain access token but has user");
    }
  } else {
    if (!req.session.user) {
      res.send("contains token but not user");
    } else {
      res.send("contains token AND user");
    }
  }
});

<<<<<<< HEAD
router.get("/error", (req, res) => {
  res.send(req.query);
});
=======
app.get('/error', (req, res) => {
  res.send(req.query)
})
>>>>>>> 74d621cb606deac111f443e2e66c6b207af4f6a0

module.exports = app;
