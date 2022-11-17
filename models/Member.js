/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'member',
  },
  avatar: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Member = model('Member', memberSchema);

module.exports = Member;
