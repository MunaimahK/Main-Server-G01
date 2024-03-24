const mongoose = require("mongoose");
const controller = mongoose.Schema(
  {
    name: { type: String },
    frontend: { type: String },
    backend: { type: String },
    logo: { type: String },
    text: { type: String },
  },
  {
    collection: "controllers",
  }
);
// string cheese
const cModel = mongoose.model("cModel", controller);
module.exports = cModel;
