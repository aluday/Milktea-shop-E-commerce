const multer = require("multer");
var storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

module.exports = store = multer({ storage: storage });
