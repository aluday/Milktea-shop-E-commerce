const Product = require("../models/productSchema");
const Type = require("../models/typeSchema");
const {
  errorResponse,
  invalidResponse,
  successResponse,
} = require("../services/ResponseService.js");

class AdminController {
  async storeType(req, res) {
    try {
      const { type_name } = req.body;
      const checkType = await Type.findOne({ type_name: type_name });
      if (checkType) {
        return invalidResponse(res, `Loại sản phẩm "${type_name}" đã tồn tại!`);
      }
      const newType = new Type({ type_name });
      await newType.save();
      return successResponse(res, "Tạo loại sản phẩm thành công!");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async updateType(req, res) {
    try {
      const typeId = req.params.id;
      const type = await Type.findByIdAndUpdate(
        { _id: typeId },
        { ...req.body },
        { new: true }
      );
        
      return successResponse(res, "Cập nhật loại sản phẩm thành công!");
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async deleteType(req, res) {
    try {
      const typeId = req.params.id;
      await Type.findByIdAndDelete({ _id: typeId });
      return successResponse(res, "Xóa loại sản phẩm thành công!");
    } catch (error) {
      return errorResponse(res, error);
    }
  }

  async addProduct(req, res) {
    try {
      const pathToFile =
        req.file && req.file.filename ? `/uploads/${req.file.filename}` : "";
      // const { productName, size, type, basicPrice, countInStock } = req.body;

      const checkProduct = await Product.findOne({
        productName: req.body.productName,
      });
      if (checkProduct) {
        return invalidResponse(res, `Sản phẩm "${req.body.productName}" đã tồn tại!`);
      }
      const newSize = JSON.parse(req.body.size);
      const newProduct = new Product({
        productName: req.body.productName,
        image: pathToFile,
        basicPrice: req.body.basicPrice,
        countInStock: req.body.countInStock,
        size: newSize,
        type: req.body.type,
        // discount: req.body.discount ? req.body.discount : 0
      });
      await newProduct.save();

      return successResponse(res, "Tạo sản phẩm thành công!");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async updateProduct(req, res) {
    try {
      // const productId = req.params.id;
      const { id } = req.params;
      const pathToFile =
        req.file && req.file.filename ? `/uploads/${req.file.filename}` : "";

      const newSize = JSON.parse(req.body.size);
      const newProduct = {
        productName: req.body.productName,
        image: pathToFile,
        basicPrice: req.body.basicPrice,
        countInStock: req.body.countInStock,
        size: newSize,
        type: req.body.type,
      };

      const product = await Product.findByIdAndUpdate(
        { _id: id },
        newProduct,
        { new: "true" }
      );

      return successResponse(res, "Cập nhật sản phẩm thành công!");

    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await Product.findByIdAndDelete({ _id: productId });
      return successResponse(res, "Xóa sản phẩm thành công!");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }
}

module.exports = new AdminController();
