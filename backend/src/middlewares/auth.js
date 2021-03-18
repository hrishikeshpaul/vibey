export function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export function checkLogin(req, res, next) {
  if (req.session.user) {
    return res.redirect("/home");
  }
  next();
}
