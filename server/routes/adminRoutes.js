const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/AdminController");
const store = require("../middlerwares/multer");
const userControllers = require("../controllers/UserController");

router.post("/create-type", adminControllers.storeType);
router.post(
  "/create-product",
  store.single("image"),
  adminControllers.addProduct
);
router.put("/update-type/:id", adminControllers.updateType);
router.put("/update-product/:id", store.single("image"), adminControllers.updateProduct);
router.delete("/delete-product/:id", adminControllers.deleteProduct);
router.delete("/delete-type/:id", adminControllers.deleteType);
router.delete("/delete-user/:id", userControllers.deleteUser);
router.get("/get-all-user", userControllers.getAllUser);

module.exports = router;
