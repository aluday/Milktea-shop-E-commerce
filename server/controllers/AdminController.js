const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const baseUrl = "http://localhost:3001";

const Product = require("../models/productSchema");
const Type = require("../models/typeSchema");

class AdminController {
  async storeType(req, res) {
    try {
      const { type_name } = req.body;
      const checkType = await Type.findOne({ type_name: type_name });
      if (checkType) {
        return res.status(200).send({
          status: "false",
          message: "Type is existed",
        });
      }
      const newType = new Type({ type_name });
      await newType.save();
      return res.status(200).send({
        status: "true",
        message: "Create new type statusfully",
        newType,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while add type product",
        error,
      });
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
      return res.status(201).send({
        status: "true",
        message: "Update type statusfully",
        type,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteType(req, res) {
    try {
      const typeId = req.params.id;
      await Type.findByIdAndDelete({ _id: typeId });
      return res.status(201).send({
        status: "true",
        message: "Delete type statusfully",
      });
    } catch (error) {
      console.log(error);
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
        return res.status(403).send({
          status: "false",
          message: "Product is existed",
        });
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

      return res.status(200).send({
        status: "true",
        message: "Create product successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while adding new product",
        error,
      });
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

      return res.status(200).send({
        status: "true",
        message: "Update product successfully",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while updating product",
        error,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await Product.findByIdAndDelete({ _id: productId });
      return res.status(200).send({
        status: "true",
        message: "Delete product statusfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "error",
        error,
      });
    }
  }
}

module.exports = new AdminController();
