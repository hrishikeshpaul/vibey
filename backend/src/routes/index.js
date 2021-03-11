import { app } from "../common/app";
import { spotifyApi } from "../common/spotify";
import { isLoggedIn } from "../middlewares/auth";

app.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.get("/me", isLoggedIn, async (req, res, next) => {
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

app.get("/getPlaylist", (req, res, next) => {
  spotifyApi.getUserPlaylists("nutkesh").then(
    function (data) {
      res.send(data);
    },
    function (err) {
      res.status(err.body.error.status).send(err);
    }
  );
});

app.get("/test-session", async (req, res) => {
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

app.get("/error", (req, res) => {
  res.send(req.query);
});

module.exports = app;
