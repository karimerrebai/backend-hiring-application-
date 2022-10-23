const mongoose = require('mongoose')
const user = require('./user')
const adminSchema = new mongoose.Schema({


},
  { timestamps: true })
module.exports = user.discriminator("Admin", adminSchema);