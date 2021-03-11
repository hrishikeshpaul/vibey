export function isLoggedIn(req, res, next) {
  if(req.session.user) {
    return next();
  } else {
    return res.status(401).send('Unauthorized')
  }
}