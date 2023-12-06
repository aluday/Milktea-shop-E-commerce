const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/milkteashop_db";
async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database sucessfully connected");
  } catch (err) {
    console.log(err);
    console.log("Database failure connected");
  }
}

module.exports = { connect };
