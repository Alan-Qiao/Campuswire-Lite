const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const path = require('path')

const AccountRouter = require('./routes/accounts')
const ApiRouter = require('./routes/api')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://developer:3U999WPFiaJWZsg8@cluster0.1mr6s.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['campuswirelite'],
  maxAge: 10 * 10 * 1000,
}))

app.use(express.static('dist'))

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err)
    return
  }
  res.status(500)
  res.json({ error: err, message: err.message })
})

app.listen(3000, () => {
  console.log('listening on 3000')
  console.log('mongoDB is connected')
})
