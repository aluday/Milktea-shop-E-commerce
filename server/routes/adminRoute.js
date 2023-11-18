const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const store = require("../middlerware/multer");
const userController = require("../controller/userController");
const { authMidlerware } = require("../middlerware/authMidlerware");

router.post("/createType", adminController.storeType);
router.post(
  "/createProduct",
  store.single("image"),
  adminController.addProduct
);
router.put("/updateProduct/:id", authMidlerware, adminController.updateProduct);
router.delete(
  "/deleteProduct/:id",
  authMidlerware,
  adminController.deleteProduct
);

router.delete("/delete-user/:id", authMidlerware, userController.deleteUser);
router.get("/getAll", authMidlerware, userController.getAllUser);

module.exports = router;
