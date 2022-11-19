const mongoose = require('mongoose')
const Schema = mongoose.Schema

<<<<<<< HEAD
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
=======

const UserSchema = new mongoose.Schema({
  google: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
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
>>>>>>> 979016fa2c51fd6765e1ad93e444ac58297d1837
})

module.exports = mongoose.model('User', UserSchema)