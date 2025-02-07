const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "tmp"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
