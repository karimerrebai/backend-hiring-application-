//const db = require("mongoose");
//db.connect("http://localhost:5000");
const { connect } = require("mongoose");
const { error, success } = require("consola");
require("dotenv").config();

const DB = "mongodb://localhost:5000/backendjobgte";
const connectToDB = async () => {
  try {
    await connect(DB);
    success({
      message: `successfully connected with the data base \n ${DB}`,
      badge: true,
    });
  } catch (err) {
    error({
      message: `connection failed : ${err.message}`,
      badge: true,
    });
    connectToDB();
  }
};

module.exports = connectToDB();