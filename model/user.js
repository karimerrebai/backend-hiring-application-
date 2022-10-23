const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  city: {
    type: String
  },
  adress: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  picture: {
    type: String

  },

  verification: {
    type: String,
    required: false,
  },


  verificationCode: {
    type: String,
    required: false,
  },

  verified: {
    type: Boolean,
    default: false
  },
  verificationpassword: {
    type: String,
    required: false
  },


  role: {
    required: false,
    type: String,
    enum: ['Admin', 'Company', 'Candidate']
  }

},
  {
    timestamps: true,
  });

module.exports = mongoose.model("User", userShema
);