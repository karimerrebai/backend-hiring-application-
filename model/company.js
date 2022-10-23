const mongoose = require('mongoose')
const user = require('./user')
const schemaCompany = new mongoose.Schema({

  confirmed: {
    type: Boolean,
    default: false
  },
  phone: {
type: Number
  }, 


  matricule: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true,
  },
  offres:
    [
      {
        type: mongoose.Types.ObjectId, //type du module mongoose
        ref: "Offre",
      },
    ],

},

  { timestamps: true })
module.exports = user.discriminator("Company", schemaCompany);
