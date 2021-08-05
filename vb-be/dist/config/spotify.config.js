"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyApi = void 0;
const spotify_web_api_node_1 = require("spotify-web-api-node");
exports.spotifyApi = new spotify_web_api_node_1.default({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
//# sourceMappingURL=spotify.config.js.map