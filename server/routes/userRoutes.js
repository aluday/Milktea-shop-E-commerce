const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/UserController");
const productControllers = require("../controllers/ProductController");
const auth = require("../middlerwares/authMidlerware");
const validation = require("../middlerwares/validation");

router.get("/product", productControllers.getAllProduct);
router.get("/product-detail/:id", productControllers.getOne);
router.get("/type", productControllers.getAllType);
// router.get("/:id", productControllers.getofType);

router.post("/create-user", validation.validateUser, userControllers.createUser);

router.post("/sign-in", userControllers.loginUser);
router.post("/refresh-token", userControllers.refreshToken);
router.post("/log-out", userControllers.logoutUser);

router.put("/update-user/:id", userControllers.updateUser);

router.get("/authorize", auth.authCurrentUser, userControllers.getCurrentUser);
router.get("/detail-user/:id", userControllers.getDetailUser);

module.exports = router;
