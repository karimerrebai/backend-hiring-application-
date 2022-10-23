const mongoose = require('mongoose')
const speciality = require('./speciality')


const schemaOffre = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },

  isConfirmed: {
    default: false,
    type: Boolean

  },
  jobtitle: {
    type: String,
  },
  roles: {
    type: String
  },
  responsibilities: {
    type: String
  },
  requirements: {
    type: String
  },

  description: {
    type: String,
    required: true,

  },
  salary: {
    type: Number,
    required: true
  },
  timetype: {

    type: String,
    required: true,
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: false
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: 'Place',
    required: false

  },
  candidancies: [{
    type: mongoose.Types.ObjectId,
    ref: 'Candidacy',
    required: false

  }],
  contract: {
    type: mongoose.Types.ObjectId,
    ref: 'Skills'  //skills is the contract

  },
  speciality: {
    type: mongoose.Types.ObjectId,
    ref: 'Speciality'
  },

  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Comments',
    required: false

  }],


},
  { timestamps: true }

)
module.exports = mongoose.model('Offre', schemaOffre)