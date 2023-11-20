const express = require("express");
const { authMidlerware, authCurrentUser,  } = require("../middlerware/authMidlerware");
const orderController = require("../controller/orderController");
const router = express.Router();


router.post('/createOrder/:id', authCurrentUser, orderController.createOrder);

router.get('/get-all-order/:id',authCurrentUser, orderController.getAllOrderDetails);
router.get('/get-details-order/:id', orderController.getOrderDetails);
router.get('/get-all-order',authMidlerware, orderController.getAllOrder);

module.exports = router;