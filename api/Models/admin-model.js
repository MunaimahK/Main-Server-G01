const mongoose = require("mongoose");
const Admin = mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  {
    collection: "admin",
  }
);
// string cheese
const adminModel = mongoose.model("adminModel", Admin);
module.exports = adminModel;
