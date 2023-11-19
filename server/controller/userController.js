const bcrypt = require("bcrypt");
const Customer = require("../model/customerSchema");
const {
  genneralAccessToken,
  genneralRefreshToken,
} = require("../middlerware/JwtServices.js");
const JwtServices = require("../middlerware/JwtServices");

class userController {
  async createUser(req, res) {
    try {
      const { name, email, phone, username, password, confirmPassword } =
        req.body;
      const checkExist = await Customer.findOne({ email });
      const saltRounds = 10;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);
      if (
        !name ||
        !email ||
        !phone ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        return res.status(200).send({
          status: "false",
          messeage: "Input is required",
        });
      } else if (!isCheckEmail) {
        return res.status(200).send({
          status: "false",
          messeage: "Email is in wrong format",
        });
      } else if (checkExist) {
        return res.status(200).send({
          status: "false",
          messeage: "Email is already",
        });
      } else if (password !== confirmPassword) {
        return res.status(200).json({
          status: "false",
          message: "The password is equal confirmPassword",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newUser = new Customer({
        name,
        email,
        phone,
        username,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(200).send({
        status: "true",
        messeage: "Sign-up statusfully",
        newUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while registing user",
        error,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      // console.log(username, password);
      const checkExist = await Customer.findOne({ username });
      if (!username || !password) {
        return res.status(200).send({
          status: "false",
          messeage: "Username or password is required",
        });
      } else if (!checkExist) {
        return res.status(200).send({
          status: "false",
          messeage: "Username does not exist",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkExist.password);
      if (!comparePassword) {
        return res.status(200).send({
          status: "false",
          messeage: "Password is not correct",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkExist.id,
        isAdmin: checkExist.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkExist.id,
        isAdmin: checkExist.isAdmin,
      });

      const response = { access_token, status: "true", message: "success" };
      const { ...newRespone } = response;
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });
      return res.status(200).send({
        ...newRespone,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while login user",
        error,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const data = req.body;
      const checkUser = await Customer.findOne({ _id: userId });

      if (!checkUser) {
        return res.status(404).send({
          status: "false",
          messeage: "User is not exist",
        });
      }

      const newUpdate = await Customer.findByIdAndUpdate(userId, data, {
        new: "true",
      });

      return res.status(200).send({
        status: "true",
        messeage: "Update user statusfully",
        newUpdate,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while login user",
        error,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      // const token = req.headers;
      // console.log(token);
      const checkUser = await Customer.findById({ _id: userId });
      if (!checkUser) {
        return res.status(404).send({
          status: "false",
          messeage: "User is not exist",
        });
      }

      await Customer.findByIdAndDelete(userId);
      return res.status(200).send({
        status: "true",
        messeage: "Delete user statusfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while login user",
        error,
      });
    }
  }

  async getAllUser(req, res) {
    try {
      const users = await Customer.find({});
      return res.status(200).send({
        status: "true",
        messeage: "List user",
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while get user",
        error,
      });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const userId = req.userId;
      const currentUser = await Customer.findById({ _id: userId }, "-password");
      return res.status(200).send({
        status: "true",
        messeage: "User detail",
        currentUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while get user",
        error,
      });
    }
  }

  async getDetailUser(req, res) {
    try {
      const userId = req.params.id;

      const checkUser = await Customer.findOne({ _id: userId });
      console.log(checkUser);
      if (!checkUser) {
        return res.status(200).send({
          status: "false",
          messeage: "User dose not exist",
        });
      }
      return res.status(200).send({
        status: "true",
        messeage: "User detail",
        checkUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        messeage: "Error while get user",
        error,
      });
    }
  }

  async refreshToken(req, res) {
    // console.log(req.cookies);
    try {
      const token = req.cookies.refresh_token;
      if (!token) {
        return res.status(200).send({
          status: "false",
          messeage: "Token not found",
        });
      }
      const response = await JwtServices.refreshTokenService(token);
      return res.status(200).send({
        response,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({
        status: "false",
        messeage: "Error while get user",
        error,
      });
    }
  }

  async logoutUser(req, res) {
    // console.log(req.cookies);
    try {
      res.clearCookie("refresh_token");
      return res.status(200).json({
        status: "OK",
        message: "Logout successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  }
}

module.exports = new userController();
