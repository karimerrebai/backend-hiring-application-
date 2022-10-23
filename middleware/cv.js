const multer = require("multer");

// destination and the cb means the call back function
// destination is a method in disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./stores");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);

    cb(null, new Date().toISOString() + file.originalname);
  },
});



module.exports = multer({
  storage: storage,

  limits: { fileSize: 1024 * 1024 * 1024 * 10 },
});