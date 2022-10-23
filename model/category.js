const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  specialities://relation 
    [
      {
        type: mongoose.Types.ObjectId, //type du module mongoose
        ref: "Speciality",
      },
    ],

},
  { timestamps: true })
module.exports = mongoose.model("Category", categorySchema);