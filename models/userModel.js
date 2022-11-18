const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  subscribed: {
    type: Boolean,
    required: true,
    default: false,
  },
  trialAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
