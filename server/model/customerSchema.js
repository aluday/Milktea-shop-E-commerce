const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      // require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String
    },
    username: {
      type: String,
      // require: true,
      unique: true,
    },
    password: {
      type: String,
      // require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    }
    // acces_token: {
    //   type: String,
    //   require: true,
    // },
    // refresh_toke: {
    //   type: String,
    //   require: true,
    // },
    // cart: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product'
    // }],
    // order: [{
    //     type:mongoose.Schema.Types.ObjectId ,
    //     ref: 'Order'
    // }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
