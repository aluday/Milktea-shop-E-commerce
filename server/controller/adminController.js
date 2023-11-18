const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../middlerware/Mongoose");
const baseUrl = "http://localhost:3001";

const typeProduct = require("../model/typeProductSchema");
const Product = require("../model/productSchema");

class adminController {
  async storeType(req, res) {
    try {
      const { type_name } = req.body;
      const checkType = await typeProduct.findOne({ type_name: type_name });
      if (checkType) {
        return res.status(200).send({
          status: "false",
          message: "Type is existed",
        });
      }
      const newType = new typeProduct({ type_name });
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

  async addProduct(req, res) {
    try {
      if (req && req.body) {
        const pathToFile =
          req.body.image && req.body.image.name
            ? `/uploads/${req.body.image.name}`
            : "";
        const { productName, size, type, basicPrice, countInStock } = req.body;

        const existingType = await typeProduct.findOne({ type_name: type });
        const checkProduct = await Product.findOne({
          productName: productName,
        });

        if (!existingType) {
          return res.status(404).send({
            status: "false",
            message: "Type not found",
          });
        }
        if (checkProduct) {
          return res.status(200).send({
            status: "false",
            message: "Product is existed",
          });
        }

        const newProduct = new Product({
          productname,
          image: pathToFile,
          basicPrice,
          countInStock,
          size,
          type: existingType,
        });
        await typeProduct.findByIdAndUpdate(existingType._id, {
          $push: { product: newProduct._id },
        });
        await newProduct.save();
        return res.status(200).send({
          status: "true",
          message: "Create product statusfully",
          newProduct,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while add product",
        error,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByIdAndUpdate(
        { _id: productId },
        { ...req.body },
        { new: "true" }
      );
      console.log(product);
      return res.status(201).send({
        status: "true",
        message: "Update product statusfully",
        product,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findById({ _id: productId });

      const typePd = await String(product.type);

      await typeProduct.findByIdAndUpdate(
        { _id: typePd },
        { $pull: { product: productId } }
      );
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

module.exports = new adminController();
