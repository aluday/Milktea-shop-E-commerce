const express = require("express");
const { authMidlerware, authCurrentUser,  } = require("../middlerware/authMidlerware");
const orderController = require("../controller/orderController");
const router = express.Router();
// authCurrentUser

router.post('/create-order',orderController.createOrder);

router.get('/get-all-order/:id', orderController.getAllOrderDetails);
router.get('/get-details-order/:id', orderController.getOrderDetails);
router.get('/get-all-order', orderController.getAllOrder);

router.delete('/cancel-order/:id', orderController.cancelOrderDetails)

module.exports = router;