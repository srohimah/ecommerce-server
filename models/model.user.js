const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../middleware/hash')

const UserSchema = new Schema({
  name:  String,
  email: String,
},{
  timestamps: true
});

const User = mongoose.model('User',UserSchema)
module.exports = User