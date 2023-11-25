const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const store = require("../middlerware/multer");
const userController = require("../controller/userController");
// const { authMidlerware } = require("../middlerware/authMidlerware");

router.post("/create-type", adminController.storeType);
router.post(
  "/create-product",
  store.single("image"),
  adminController.addProduct
);
router.put("/update-type/:id", adminController.updateType);
router.put("/update-product/:id", adminController.updateProduct);
router.delete("/delete-product/:id", adminController.deleteProduct);
router.delete("/delete-type/:id", adminController.deleteType);

router.delete("/delete-user/:id", userController.deleteUser);
router.get("/get-all-user", userController.getAllUser);

module.exports = router;
