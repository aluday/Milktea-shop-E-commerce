const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../services/MongooseService");

const baseUrl = "http://localhost:3001";
const Product = require("../models/productSchema");

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
  async getOne(req, res) {
    try {
      const { id } = req.params;
      console.log(req);
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
      const types = await Product.find({}).distinct('type');
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

  // async getofType(req, res) {
  //   try {
  //     const typeId = req.params.id;
  //     // console.log(id);
  //     const products = await typeProduct
  //       .findById({ _id: typeId })
  //       .populate("Product");

  //     return res.status(200).send({
  //       status: true,
  //       message: "",
  //       products: products,
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
