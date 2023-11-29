const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

function route(app) {
  app.use("/api/admin", adminRoutes);
  app.use("/api", userRoutes);
  app.use("/api/order", orderRoutes);
}

module.exports = route;
