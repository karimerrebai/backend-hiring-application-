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

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("image uploaded is not type of jpeg ,png or jpg"));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 1024 * 10 },
});
