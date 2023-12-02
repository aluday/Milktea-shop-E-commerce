const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController");
const store = require("../middlerwares/multer");
const userController = require("../controllers/UserController");

router.post("/create-type", adminController.storeType);
router.post(
  "/create-product",
  store.single("image"),
  adminController.addProduct
);
router.put("/update-type/:id", adminController.updateType);
router.put("/update-product/:id", store.single("image"), adminController.updateProduct);
router.delete("/delete-product/:id", adminController.deleteProduct);
router.delete("/delete-type/:id", adminController.deleteType);
router.delete("/delete-user/:id", userController.deleteUser);
router.get("/get-all-user", userController.getAllUsers);

module.exports = router;
