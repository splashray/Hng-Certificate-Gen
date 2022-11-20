const mongoose = require('mongoose')


const ContactSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  message: {
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Contact', ContactSchema)