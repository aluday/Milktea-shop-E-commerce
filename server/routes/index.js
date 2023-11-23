const adminRoute = require("./adminRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");

function route(app) {
  app.use("/api/admin", adminRoute);
  app.use("/api", userRoute);
  app.use("/api/order", orderRoute);
}

module.exports = route;
