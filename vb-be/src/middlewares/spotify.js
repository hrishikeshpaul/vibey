"use strict";

const { spotifyApi } = require("../lib/spotify");

/**
 * This is a middle ware to set the tokens. This is just for development
 * purposes. Since the server restarts everytime, it is a pain to
 * manually login and get the token.
 * 
 * Ideally in the client will be sending the token so this won't be needed.
 * In the event the server crashes, it should log everyone out.
 */
const setSpotifyTokens = async (req, res, next) => {
  const accessToken = req.headers["vb-spotify-at"];
  const refreshToken = req.headers["vb-spotify-rt"];

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  next();
};

module.exports = {
  setSpotifyTokens,
};
