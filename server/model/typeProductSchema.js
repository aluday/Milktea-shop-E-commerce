const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeProduct = new Schema({
  type_name: {
    type: String,
    require: true,
    unique: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
typeProduct.set("strictPopulate", false);
module.exports = mongoose.model("typeProduct", typeProduct);
