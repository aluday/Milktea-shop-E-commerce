const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
    require: true,
  },
  basicPrice: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    require: false
  },
  countInStock: {
    type: Number,
    require: true,
  },
  size: [
    {
      sizeValue: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    require: true,
  },
});

ProductSchema.set("strictPopulate", false);
module.exports = mongoose.model("Product", ProductSchema);
