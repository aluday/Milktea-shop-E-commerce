const Customer = require("../models/customerSchema");

class Validation {
  async validateUser(req, res, next) {
    try {
      if (req.body.email) {
        const isEmailExisted = await Customer.findOne({
          email: req.body.email,
        });
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isEmail = reg.test(req.body.email);
        if (!isEmail) {
          return res.status(200).send({
            status: "false",
            messeage: "Email is in wrong format",
          });
        } else if (isEmailExisted) {
          return res.status(200).send({
            status: "false",
            messeage: "Email is already",
          });
        }
      } else if (req.body.password && req.body.confirmPassword) {
        if (req.body.password !== req.body.confirmPassword) {
          return res.status(200).json({
            status: "false",
            message: "The password is not equal to the confirm password",
          });
        }
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while registing user",
        error,
      });
    }
  }
}

module.exports = new Validation();