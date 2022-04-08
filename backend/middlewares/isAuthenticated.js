const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.username) {
    const err = new Error('User not Authenticated')
    err.code = 401
    next(err)
  } else {
    next()
  }
}

module.exports = isAuthenticated
