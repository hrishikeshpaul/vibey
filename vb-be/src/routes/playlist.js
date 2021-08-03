"use strict";

const { spotifyApi } = require("../lib/spotify");
const express = require("express");
const { ErrorHandler } = require("../lib/errors");
const { HttpStatus } = require("../static/http");

const { setSpotifyTokens } = require("../middlewares/spotify");

const router = express.Router();

/**
 * Get all the playlists of the currently logged in user
 */
router.get("/", setSpotifyTokens, async (req, res, next) => {
  const { limit, offset } = req.query;

  if (!limit || !offset) {
    res
      .status(HttpStatus.Error)
      .send(
        new ErrorHandler(
          HttpStatus.Error,
          "Limit and offset need to be specified."
        )
      );
  }

  try {
    const playlists = await spotifyApi.getUserPlaylists({
      offset: offset,
      limit: limit,
    });
    res.status(HttpStatus.OK).send(playlists.body.items);
  } catch (err) {
    res
      .status(err.statusCode)
      .send(new ErrorHandler(err.statusCode, err.body.error.message));
  }
});

/**
 * Gets all the tracks of a playlist
 */
router.get("/:id/tracks", setSpotifyTokens, async (req, res, next) => {
  const { limit, offset } = req.query;
  const id = req.params.id;

  if (!limit || !offset) {
    res
      .status(HttpStatus.Error)
      .send(
        new ErrorHandler(
          HttpStatus.Error,
          "Limit and offset need to be specified."
        )
      );
  }

  try {
    const tracks = await spotifyApi.getPlaylistTracks(id, {
      limit,
      offset,
    });
    res.status(HttpStatus.OK).send(tracks.body.items);
  } catch (err) {
    res
      .status(err.statusCode)
      .send(new ErrorHandler(err.statusCode, err.body.error.message));
  }
});

module.exports = router;
