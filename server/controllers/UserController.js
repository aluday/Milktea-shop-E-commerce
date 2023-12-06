const bcrypt = require("bcrypt");
const Customer = require("../models/customerSchema.js");
const {
  getRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../services/JwtService.js");
const {
  errorResponse,
  invalidResponse,
  successResponseWithData,
  successResponse,
} = require("../services/ResponseService.js");

class UserController {
  async createUser(req, res) {
    try {
      let newUser;
      if (req.body.password) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        newUser = new Customer({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          username: req.body.username,
          password: hashedPassword,
        });
      } else {
        newUser = new Customer({
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
        });
      }

      await newUser.save();

      return successResponseWithData(
        res,
        "Người dùng đã đăng ký tài khoản thành công!",
        newUser
      );
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async loginUser(req, res) {
    try {
      const user = req.user;

      const access_token = await generateAccessToken({
        id: user.id,
      });
      const refresh_token = await generateRefreshToken({
        id: user.id,
      });

      return successResponseWithData(
        res,
        "Người dùng đã đăng nhập thành công!",
        {
          access_token,
          refresh_token,
        }
      );
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const data = req.body;
      const checkUser = await Customer.findOne({ _id: userId });

      if (!checkUser) {
        return invalidResponse(res, "Người dùng không tồn tại");
      }

      const newUser = await Customer.findByIdAndUpdate(userId, data, {
        new: "true",
      });

      return successResponseWithData(
        res,
        "Cập nhật thông tin người dùng thành công!",
        newUser
      );
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const checkUser = await Customer.findById({ _id: userId });
      if (!checkUser) {
        return invalidResponse(res, "Người dùng không tồn tại");
      }

      await Customer.findByIdAndDelete(userId);
      return successResponse(res, "Xóa người dùng thành công!");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await Customer.find({}, "-password");
      if (!users) {
        return res.status(404).json({
          status: "false",
          message: "Không tìm thấy người dùng!",
        });
      }
      return res.status(200).send({
        status: "true",
        messeage: "Danh sách người dùng!",
        users,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async getCurrentUser(req, res) {
    try {
      const userId = req.userId;
      const currentUser = await Customer.findById({ _id: userId }, "-password");
      return res.status(200).send({
        status: "true",
        message: "Thông tin người dùng chi tiết",
        currentUser,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async getDetailUser(req, res) {
    try {
      const userId = req.params.id;

      const checkUser = await Customer.findOne({ _id: userId });
      console.log(checkUser);
      if (!checkUser) {
        return res.status(400).send({
          status: "false",
          message: "Người dùng không tồn tại!",
        });
      }
      return res.status(200).send({
        status: "true",
        message: "User detail",
        checkUser,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
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
      const response = await getRefreshToken(token);
      return res.status(200).send({
        response,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async logoutUser(req, res) {
    try {
      res.clearCookie("refresh_token");
      return res.status(200).json({
        status: "OK",
        message: "Logout successfully",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }
}

module.exports = new UserController();
