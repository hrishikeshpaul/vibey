"use strict";
exports.__esModule = true;
exports.spotifyApi = void 0;
var spotify_web_api_node_1 = require("spotify-web-api-node");
exports.spotifyApi = new spotify_web_api_node_1["default"]({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
