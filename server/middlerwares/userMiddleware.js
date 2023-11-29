const Customer = require("../models/customerSchema");
const {
  invalidResponse,
  errorResponse,
} = require("../services/ResponseService");
const bcrypt = require("bcrypt");

class UserMiddleware {
  async validateForUserRegistration(req, res, next) {
    try {
      if (req && req.body) {
        if (req.body.email) {
          const isEmailExisted = await Customer.findOne({
            email: req.body.email,
          });
          const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          const isEmail = reg.test(req.body.email);
          if (!isEmail) {
            return invalidResponse(res, "Email is in wrong format!");
          } else if (isEmailExisted) {
            return invalidResponse(res, "Email already exists!");
          }
        } else if (req.body.password && req.body.confirmPassword) {
          if (req.body.password !== req.body.confirmPassword) {
            return invalidResponse(
              res,
              "The password is not equal to the confirm password!"
            );
          }
        } else {
          next();
        }
      }
    } catch (error) {
      console.log(error);
      return errorResponse(res, "Error while registering user!", error);
    }
  }

  async validateForUserLogin(req, res, next) {
    try {
      if (req && req.body) {
        if (!req.body.username || !req.body.password) {
          return invalidResponse(res, "Missing Username or password!");
        } else {
          const user = await Customer.findOne({ username: req.body.username });
          if (!user) {
            return invalidResponse(res, "User does not exist!");
          } else {
            const comparePassword = bcrypt.compareSync(
              req.body.password,
              user.password
            );
            if (!comparePassword) {
              return invalidResponse(res, "Incorrect password!");
            } else {
              req.user = user;
              next();
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      return errorResponse(res, "Error while user is logging in!", error);
    }
  }
}

module.exports = new UserMiddleware();
