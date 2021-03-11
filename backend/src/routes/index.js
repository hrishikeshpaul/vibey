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
    .then(({ body }) => {
      res.send(body);
    })
    .catch((error) => {
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

router.get("/error", (req, res) => {
  res.send(req.query);
});

module.exports = router;
