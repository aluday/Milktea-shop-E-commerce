const express = require("express");
const orderControllers = require("../controllers/OrderController");
const router = express.Router();

router.post('/create-order',orderControllers.createOrder);
router.get('/get-all-order/:id', orderControllers.getAllOrderDetails);
router.get('/get-details-order/:id', orderControllers.getOrderDetails);
router.get('/get-all-order', orderControllers.getAllOrder);
router.delete('/cancel-order/:id', orderControllers.cancelOrderDetails)

module.exports = router;