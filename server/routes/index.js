const adminRoute = require("./adminRoute");
const userRoute = require("./userRoute");

function route(app) {
  app.use("/api/admin", adminRoute);
  app.use("/api", userRoute);
}

module.exports = route;
