const mongoose = require('mongoose')

const PlaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    offres: [

      {
        type: mongoose.Types.ObjectId, //type du module mongoose
        ref: "Offre",
      },


    ]

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Place', PlaceSchema);
