export function validateTagName(req, res, next) {
  if (req.query.name) {
    return next();
  } else {
    return res.status(400).send("Tag name required");
  }
}

export function validateTagLength(req, res, next) {
  if (req.query.name.length < 20) {
    return next();
  } else {
    return res.status(400).send("Maximum length reached");
  }
}
