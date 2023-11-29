const Customer = require("../models/customerSchema");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");

class OrderController {
  async createOrder(req, res) {
    try {
      const { orderItems, totalPrice, user } = req.body;
      const newOrder = new Order({
        orderItems,
        totalPrice,
        user,
      });
      await newOrder.save();

      return res.status(200).json({
        success: "true",
        message: "Create order successfully",
        data: newOrder,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: "false",
        message: "Error",
      });
    }
  }

  async getOrderDetails(req, res) {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(200).json({
          success: "false",
          message: "The orderId is required",
        });
      }
      const order = await Order.findById({ _id: orderId });
      // console.log(order);
      if (!order) {
        return res.status(200).json({
          success: "false",
          message: "The order is not defined",
        });
      }
      const userId = await order.user;
      // console.log(userId);
      const user = await Customer.findById(
        { _id: userId },
        "-password -isAdmin"
      );
      console.log(user);
      return res.status(200).json({
        success: "true",
        message: "Order detail",
        data: order,
        user: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: "false",
        message: "Error",
      });
    }
  }

  async cancelOrderDetails(req, res) {
    try {
      const data = req.body.orderItems;
      const orderId = req.body.orderId;
      if (!orderId) {
        return res.status(200).json({
          status: "ERR",
          message: "The orderId is required",
        });
      }

      let order = [];
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          { _id: order.product },
          { $inc: { countInStock: +order.amount } },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete({ _id: orderId });
          if (order === null) {
            res.status(200).send({
              status: "Err",
              success: "false",
              message: "The order is not defined",
            });
          }
        } else {
          return {
            status: "OK",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;
      if (newData) {
        res.status(404).send({
          status: "ERR",
          message: `San pham voi id: ${newData} khong ton tai`,
        });
      }
      res.status(200).send({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: "false",
        message: "Error",
      });
    }
  }

  async getAllOrderDetails(req, res) {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        success: "false",
        message: "The userId is required",
      });
    }
    const order = await Order.find({ user: userId }).sort({
      createdAt: -1,
      updatedAt: -1,
    });
    if (!order) {
      return res.status(200).json({
        success: "false",
        message: "The order is not defined",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "List orders",
      data: order,
    });
  }

  async getAllOrder(req, res) {
    try {
      const orders = await Order.find().sort({ createdAt: -1, updatedAt: -1 });
      if (!orders) {
        return res.status(200).json({
          success: "false",
          message: "Order list is empty",
        });
      }
      return res.status(200).json({
        success: "true",
        message: "List orders",
        data: orders,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: "false",
        message: "Error",
      });
    }
  }
}

module.exports = new OrderController();
