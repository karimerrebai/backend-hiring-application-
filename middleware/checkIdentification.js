const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.APP_SECRET;
checkIden = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(403).json({
        message: "no token",
      });
    }
   
    const decoder = await jwt.verify(token, SECRET);//verify:verifier date d'expiration et recuperer user
    
    req.user = decoder;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "identification failed",
      error: error.message,
    });
  }
};
module.exports = checkIden;