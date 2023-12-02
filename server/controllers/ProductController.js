const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../services/MongooseService");
const mongoose = require('mongoose');
const baseUrl = "http://localhost:3001";
const Product = require("../models/productSchema");
const Type = require("../models/typeSchema");

class ProductController {
  async getAllProduct(req, res) {
    try {
      const total = await Product.count();
      let { limit, page, filter } = req.query;
      limit = Number(limit) || 8;
      page = Number(page) || 0;
      if (filter) {
        const label = filter[0];
        const allObjectFilters = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);
        allObjectFilters.forEach((allObjectFilter) => {
          allObjectFilter.image = baseUrl + allObjectFilter.image;
        });
        return res.status(200).send({
          status: "true",
          message: "All products lists",
          total,
          products: mutipleMongooseToObject(allObjectFilters),
          pageCurrent: Number(page) + 1,
          totalPage: Math.ceil(total / Number(limit)),
        });
      }

      const products = await Product.find({})
        .limit(limit)
        .skip(limit * page)
        
      products.forEach((product) => {
        product.image = baseUrl + product.image;
      });
      const modifiedProducts = products.map((product) => ({
        ...product._doc
      }));

      if (!products) {
        return res.status(200).send({
          status: "false",
          message: "No product found",
        });
      }
      return res.status(200).send({
        status: true,
        message: "All products lists",
        total,
        products: mutipleMongooseToObject(modifiedProducts),
        pageCurrent: Number(page) + 1,
        totalPage: Math.ceil(total / Number(limit)),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while getting product",
        error,
      });
    }
  }
  async getProductsByType(req, res) {
    try {
      const typeId = new mongoose.mongo.ObjectId(req.params.id);
      const products = await Product.find({type: typeId});
      
      if (!products) {
        return res.status(404).send({
          status: "false",
          message: "No product found",
        });
      }

      products.forEach((product) => {
        product.image = baseUrl + product.image;
      });
      const modifiedProducts = products.map((product) => ({
        ...product._doc
      }));

      return res.status(200).send({
        status: true,
        message: "All products lists",
        products: mutipleMongooseToObject(modifiedProducts),
      });

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while getting product",
        error,
      });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      product.image = baseUrl + product.image;
      if (!product) {
        return res.status(404).send({
          status: "false",
          message: "product not found",
        });
      }
      return res.status(200).send({
        status: true,
        message: "fetch single product",
        product: mongooseToObject(product),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "false",
        message: "Error while get single product",
        error,
      });
    }
  }
  async getAllType(req, res) {
    try {
      const types = await Type.find({});
      return res.status(200).send({
          status: true,
          message: 'All Type Product',
          data: types
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
          status: 'false',
          message: 'Error while get type',
          error
      });
    }
  }

  // async getAllOfType(req, res) {
  //   try {
  //     const typeId = req.params.id;
  //     const products = await Product.find({type: typeId})
  //     products.forEach((product) => {
  //       product.image = baseUrl + product.image;
  //     });
  //     return res.status(200).send({
  //       status: true,
  //       message: "Type product list",
  //       data: products,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({
  //       status: "false",
  //       message: "Error while get product",
  //       error,
  //     });
  //   }
  // }
}

module.exports = new ProductController();
