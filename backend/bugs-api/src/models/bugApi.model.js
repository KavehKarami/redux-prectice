const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugApiModel = Schema({
  description: { type: String, require: true },
  userId: { type: Number, require: true },
  resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model("bugs-api", bugApiModel);
