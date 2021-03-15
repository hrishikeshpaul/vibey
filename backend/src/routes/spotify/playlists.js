import { isLoggedIn } from "../../middlewares/auth";
import { spotifyApi } from "../../common/spotify";
import {
  validateGetUserPlaylistsQuery,
  validatePlaylistId,
} from "../../middlewares/playlists";

var express = require("express");
var router = express.Router();

/**
 * /api/spotify/playlists/all
 * Get all playlists for current user
 * username, limit and offset necessary
 * RELEVANT ENDPOINT: https://api.spotify.com/v1/me/playlists
 * Not sure how we want to handle passing in username
 */
router.get(
  "/all",
  validateGetUserPlaylistsQuery,
  async function (req, res, next) {
    const { limit, offset, username } = req.query;
    try {
      const response = await spotifyApi.getUserPlaylists(username, {
        limit,
        offset,
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

/**
 * /api/spotify/playlists/playlist?id={id}
 * Get a specific playlist from current user
 */
router.get("/playlist", validatePlaylistId, async function (req, res, next) {
  const { id } = req.query;
  try {
    const response = await spotifyApi.getPlaylist(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
