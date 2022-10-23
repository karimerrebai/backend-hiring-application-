const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now
    },




    text: {
      type: String
    },

    candidate: {
      type: mongoose.Types.ObjectId,
      ref: 'Candidate',
      required: false
    },
    offre: {
      type: mongoose.Types.ObjectId,
      ref: 'Offre',
      required: false
    }


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comments', CommentSchema);
