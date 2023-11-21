const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderItems: [
      {
        productName: { type: String, required: true },
        image: { type: String, required: true },
        amount: {type: Number, required: true},
        size: [
          {
            sizeValue: {type: String},
            price: {type: Number,require: true},
          },
        ],
        discount: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullname: { type: String },
      address: { type: String},
      city: { type: String },
      phone: { type: String },
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    delivereAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Oder", orderSchema);
