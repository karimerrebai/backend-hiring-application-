const mongoose = require('mongoose')
const candidate = require('./candidate')

const schemaCandidacy = new mongoose.Schema({

  date: {
    type: Date,
    default: Date.now
  },

isconfirmed: {
    default: null,

    type: Boolean
  },
  cv: {
    required: true,
    type: String,
  },
  coverLetter: {
    required: true,
    type: String

  },
  offre: {
    type: mongoose.Types.ObjectId,
    ref: 'Offre',
    required: false

  },
  candidate: {
    type: mongoose.Types.ObjectId,
    ref: 'Candidate',
    requird: true
  }

},

  { timestamps: true }
)

module.exports = mongoose.model('Candidacy', schemaCandidacy)