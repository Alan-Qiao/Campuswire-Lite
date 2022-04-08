const express = require('express')

const Question = require('../models/question')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/questions', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    next(e)
  }
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  try {
    const { body: { questionText } } = req
    await Question.create({ questionText, author: req.session.username })
    res.send('Question added')
  } catch (e) {
    next(e)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  try {
    const { body: { _id, answer } } = req

    const mods = await Question.updateOne({ _id }, { $set: { answer } })
    if (mods.matchedCount < 1) {
      throw Error('Question not found')
    }
    res.send('Modified answer to question')
  } catch (e) {
    next(e)
  }
})

module.exports = router
