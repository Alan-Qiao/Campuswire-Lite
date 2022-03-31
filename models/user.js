const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.methods.checkPassword = function checkPassword(input, cb) {
  cb(input === this.password)
}

const User = model('User', userSchema)

module.exports = User
