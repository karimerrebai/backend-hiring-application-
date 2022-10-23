const mongoose = require('mongoose')
const schemaSkills = new mongoose.Schema({

  name: {
    type: String,
    required: true,

  },
  offres: [{
    type: mongoose.Types.ObjectId,
    ref: 'Offre',
    required: false

  }],


},
  { timestamps: true }
)
module.exports = mongoose.model("Skills", schemaSkills
);