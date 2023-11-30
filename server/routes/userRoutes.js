const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const productController = require("../controllers/ProductController");
const auth = require("../middlerwares/authMidlerware");
const userMiddleware = require("../middlerwares/userMiddleware");

router.get("/product", productController.getAllProduct);
router.get("/product-detail/:id", productController.getOne);
router.get("/type", productController.getAllType);
// router.get("/get-all-of-type/:id", productController.getAllOfType);

router.post(
  "/create-user",
  userMiddleware.validateForUserRegistration,
  userController.createUser
);

router.post(
  "/sign-in",
  userMiddleware.validateForUserLogin,
  userController.loginUser
);
router.get("/authorize", auth.authCurrentUser, userController.getCurrentUser);

router.post("/refresh-token", userController.refreshToken);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", userController.updateUser);
router.get("/detail-user/:id", userController.getDetailUser);


module.exports = router;
