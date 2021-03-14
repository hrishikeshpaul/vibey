import { isLoggedIn } from "../../middlewares/auth";
import { spotifyApi } from "../../common/spotify";

var express = require("express");
var router = express.Router();

/**
 * /api/spotify/playlists/all
 * Get all playlists for current user
 * limit and offset necessary
 */
router.get("/all", async function (req, res, next) {
  const { limit, offset } = req.query;
  try {
    const result = await spotifyApi.getUserPlaylists("sjmunro-us");
    res.status(200).json(result);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ err: err });
  }
  // https://api.spotify.com/v1/me/playlists
  // res.status(200).json("there");
});

/**
 * /api/spotify/playlists/id
 * Get a specific playlist from current user
 */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  res.status(200).json(id);
});

module.exports = router;
