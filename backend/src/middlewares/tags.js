/**
 * We could go really extra with these,
 * i.e. making sure chars are string (not integer), english chars only, etc
 *
 */

/**
 * If not tag name, return 400
 */
export function validateTagName(req, res, next) {
  if (req.query.name) {
    return next();
  } else {
    return res.status(400).json({ error: "Tag name required" });
  }
}

/**
 * Max tag length 20 characters.
 */
export function validateTagLength(req, res, next) {
  if (req.query.name.length < 20) {
    return next();
  } else {
    return res.status(400).json({ error: "Tag name exceeded maximum length" });
  }
}
