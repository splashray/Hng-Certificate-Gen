const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
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
  collections : [ {type : mongoose.Schema.Types.ObjectId, ref : 'Data'}] 
})

module.exports = mongoose.model('User', UserSchema)