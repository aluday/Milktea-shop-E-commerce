const multer = require("multer");
var storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = store = multer({ storage: storage });
