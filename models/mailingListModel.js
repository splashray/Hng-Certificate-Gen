const mongoose = require('mongoose')

const mailListSchema = new mongoose.Schema({
   email:{
       type:String,
       required: [true, 'Must provide Email Address'],
       maxlength: [40, 'Email address can not be more than 40 characters'],
       unique: true
    }
},
{ timestamps: true })

module.exports = mongoose.model('MailingList', mailListSchema)
