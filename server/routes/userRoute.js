const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const productController = require("../controller/productController");
const { authUserMiddleWare } = require("../middlerware/authMidlerware");

router.get("/product", productController.getAllProduct);
router.get("/product-detail/:id", productController.getOne);
router.get("/type", productController.getAllType);
router.get("/:id", productController.getofType);

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);
router.post("/log-out", userController.logoutUser);

router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.get(
  "/detail-user/:id",
  authUserMiddleWare,
  userController.getDetailUser
);

module.exports = router;
