const Customer = require("../models/customerSchema");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const baseUrl = "http://localhost:3001";
const {
  errorResponse,
  notFoundResponse,
  successResponse,
  successResponseWithData,
} = require("../services/ResponseService.js");

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

      return successResponse(res, "Đặt hàng thành công!");
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
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
      if (!order) {
        return res.status(200).json({
          success: "false",
          message: "The order is not defined",
        });
      }
      const userId = await order.user;
      const user = await Customer.findById(
        { _id: userId },
        "-password -isAdmin"
      );
      return res.status(200).json({
        success: "true",
        message: "Order detail",
        data: order,
        user: user,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
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
      return errorResponse(res, error);
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
      let orders = await Order.find()
        .sort({ createdAt: -1, updatedAt: -1 })
        .populate({
          path: 'orderItems.product',
          model: 'Product',
          select: '-_id -size -basicPrice -countInStock'
        })
        .populate({
          path: 'user',
          select: '-_id -isAdmin -password -username',
          model: 'Customer', 
        });
      
      if (!orders) {
        return notFoundResponse(res, "Không tìm thấy đơn hàng nào!");
      }

      const transformedOrders = orders.map((order) => {
        // if (order.orderItems && typeof order.orderItems === 'object') {
        //   order.orderItems = [order.orderItems];
        // }
        const transformedOrderItems = order.orderItems.map((orderItem) => ({
          productName: orderItem.product.productName,
          image: baseUrl + orderItem.product.image,
          discount: orderItem.product.discount,
          amount: orderItem.amount,
          size: orderItem.size,
        }));
  
        return {
          _id: order._id,
          orderNo: order.orderNo,
          orderItems: transformedOrderItems,
          totalPrice: order.totalPrice,
          user: order.user,
          isPaid: order.isPaid,
          isDelivered: order.isDelivered,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          __v: order.__v,
        };
      });
      
      return successResponseWithData(res, "Danh sách đơn hàng", transformedOrders);
    } catch (error) {
      console.log(error);
      return errorResponse(res, error);
    }
  }
}

module.exports = new OrderController();
