const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.authMidlerware = (req, res, next) => {
  console.log(req.headers.token);
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      res.status(404).send({
        success: false,
        message: "The authentication",
        err,
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(403).send({
        success: false,
        message: "not have access",
      });
    }
  });
};

exports.authCurrentUser = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    console.log("user:", user);
    if (err) {
      return res.status(404).json({
        message: "Token authentication failed",
        status: "ERROR",
      });
    } else {
      req.userId = user.id;
      next();
    }
  });
};
