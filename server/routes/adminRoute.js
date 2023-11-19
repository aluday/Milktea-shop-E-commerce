const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const store = require("../middlerware/multer");
const userController = require("../controller/userController");
// const { authMidlerware } = require("../middlerware/authMidlerware");

router.post("/createType", adminController.storeType);
router.post(
  "/createProduct",
  store.single("image"),
  adminController.addProduct
);
router.put("/updateProduct/:id", adminController.updateProduct);
router.delete("/deleteProduct/:id", adminController.deleteProduct);

router.delete("/delete-user/:id", userController.deleteUser);
router.get("/getAll", userController.getAllUser);

module.exports = router;
