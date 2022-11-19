const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique: true
  },
  authenticationType: {
    form: {
      password: String
    },
    google: {
      uuid: String
    }
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