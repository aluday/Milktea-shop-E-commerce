const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    type_name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Type", TypeSchema);

