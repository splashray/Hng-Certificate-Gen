const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
  },
  subscribed: {
    type: Boolean,
    required: true,
    default: false,
  },
  subscription: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    default : 'basic'
  },
  records: [{
    name: {
        type: String,
        required: [true, 'Name of recipient is required']
    },
    studentID : {
      type: String,
      required:  [true, 'Student ID of recipient is required']
    },
    collectionID : {
      required : true,
      type : String
    }
  }],
})

module.exports = mongoose.model('User', UserSchema)