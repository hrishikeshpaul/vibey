const setSession = (req, accessToken, refreshToken, user) => {
  req.session.access_token = accessToken;
  req.session.refresh_token = refreshToken;
  req.session.user = user;
}

module.exports = {
  setSession
}