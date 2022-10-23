const mongoose = require('mongoose');
const user = require('./user')

const candidateSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,

  },
  adress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
    minlength: 5,
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Comments',
    required: false
  }],
  candidancies: [{
    type: mongoose.Types.ObjectId,
    ref: 'Candidacy',
    required: false
  }],


},
  {
    timestamps: true,
  })
module.exports = user.discriminator("Candidate", candidateSchema);