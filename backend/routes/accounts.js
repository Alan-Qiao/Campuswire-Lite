const express = require('express')

const User = require('../models/user')

const router = express.Router()

const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/signup', async (req, res, next) => {
  try {
    const { body: { username, password } } = req
    await User.create({ username, password })
    res.send('User created')
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { body: { username, password } } = req
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('User not found')
    }
    user.checkPassword(password, isRight => {
      if (isRight) {
        req.session.username = username
        res.send(`Logged in ${username}`)
      } else {
        throw new Error('Username and password does not match')
      }
    })
  } catch (e) {
    next(e)
  }
})

router.post('/logout', isAuthenticated, async (req, res, next) => {
  try {
    req.session = null
    res.send('Succesfully logged out')
  } catch (e) {
    next(e)
  }
})

module.exports = router
