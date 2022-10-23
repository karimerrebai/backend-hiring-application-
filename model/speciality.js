const mongoose = require('mongoose')
const specialitySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId,//type du module mongoose
    ref: 'Category',//ref:le model qui a la relation avec notre model
    required: false
  },
  offres: [{
    type: mongoose.Types.ObjectId,
    ref: 'Offre',
    required: false

  }],

  },






  { timestamps: true },

)
module.exports = mongoose.model("Speciality", specialitySchema
);