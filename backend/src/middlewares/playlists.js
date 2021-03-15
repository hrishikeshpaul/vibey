export function validateGetUserPlaylistsQuery(req, res, next) {
  if (!req.query.limit || !req.query.offset) {
    return res.status(400).json({ error: "Limit and offset required" });
  } else {
    return next();
  }
}

export function validatePlaylistId(req, res, next) {
  if (!req.query.id) {
    return res.status(400).json({ error: "Playlist ID required" });
  } else {
    return next();
  }
}
