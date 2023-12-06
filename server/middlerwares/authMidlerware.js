const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const {
  unauthorizedResponse,
} = require("../services/ResponseService");

exports.authMidlerware = (req, res, next) => {
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
    if (err) {
      return unauthorizedResponse(
        res,
        "Xác thực người dùng không thành công!"
      );
    } else {
      req.userId = user.id;
      next();
    }
  });
};
