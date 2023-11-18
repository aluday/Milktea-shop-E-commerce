exports.mutipleMongooseToObject = function (mongooses) {
  return mongooses.map((mongoose) =>
    mongoose && mongoose.toObject && typeof mongoose.toObject === "function"
      ? mongoose.toObject()
      : mongoose
  );
};

exports.mongooseToObject = function (mongoose) {
  if (
    mongoose &&
    mongoose.toObject &&
    typeof mongoose.toObject === "function"
  ) {
    return mongoose.toObject();
  }
  return mongoose;
};
