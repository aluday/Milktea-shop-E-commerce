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
            return invalidResponse(res, "Sai định dạng email!");
          } else if (isEmailExisted) {
            return invalidResponse(res, "Email đã tồn tại!");
          }
        } else if (req.body.password && req.body.confirmPassword) {
          if (req.body.password !== req.body.confirmPassword) {
            return invalidResponse(
              res,
              "Mật khẩu không giống mật khẩu xác nhận!"
            );
          }
        } else {
          next();
        }
      }
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async validateForUserLogin(req, res, next) {
    try {
      if (req && req.body) {
        if (!req.body.username || !req.body.password) {
          return invalidResponse(
            res,
            "Thiếu thông tin trường tên người dùng hoặc mật khẩu!"
          );
        } else {
          const user = await Customer.findOne({ username: req.body.username });
          if (!user) {
            return invalidResponse(res, "Người dùng không tồn tại!");
          } else {
            const comparePassword = bcrypt.compareSync(
              req.body.password,
              user.password
            );
            if (!comparePassword) {
              return invalidResponse(res, "Mật khẩu không chính xác!");
            } else {
              req.user = user;
              next();
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }
}

module.exports = new UserMiddleware();
