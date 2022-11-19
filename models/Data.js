const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    award: {
        type: String,
        required: true,
    },
    name_of_organization: {
        type: String,
        required: true,
    },
    signed: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    client :{
        type: mongoose.Schema.Types.ObjectId, ref : 'User',
        required : true
    },
    groupID : {
        type: String,
        requried: true
    }
})

module.exports = mongoose.model('Data', DataSchema)