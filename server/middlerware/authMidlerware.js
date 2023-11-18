const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const authMidlerware = (req, res, next) => {
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

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMidlerware,
  authUserMiddleWare,
};
