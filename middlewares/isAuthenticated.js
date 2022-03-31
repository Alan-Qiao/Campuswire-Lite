const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.username) {
    next(new Error('User not Authenticated'))
  } else {
    next()
  }
}

module.exports = isAuthenticated
