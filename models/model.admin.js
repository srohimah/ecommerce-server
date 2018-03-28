const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../middleware/hash')

const AdminSchema = new Schema({
  name:  String,
  email: String,
  password: String,
},{
  timestamps: true
});
AdminSchema.pre('save',function(){
  if(this.password)this.password = hash.generate(this.password)
})

const Admin = mongoose.model('Admin',AdminSchema)
module.exports = Admin