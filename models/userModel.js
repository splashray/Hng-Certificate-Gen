const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  password:{
    type:String,
    required:true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
  },
  subscribed: {
    type: Boolean,
    required: true,
    default: false
  },
  trialAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
})

module.exports = mongoose.model('User', UserSchema)