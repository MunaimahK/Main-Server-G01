const mongoose = require("mongoose");
const User = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "oauthModel",
    },
    name: String,
    major: String,
    gradDate: String,
    /*
    name: String,
    username: String,
    email: String,
    ucfid: String,
    gender: String,
    paidDues: Boolean,
    isAdmin: Boolean,
    custom: String,*/
  },
  {
    collection: "members",
  }
);

// collection specifies where the schema is inserted
// bu default uses users collection in Mongo
// Specified to main collection inside of the iNflux-main DB

const usermodel = mongoose.model("User", User);
module.exports = usermodel;

/*
 {
      "name": "john",
      "username": "test",
      "email": "test@mail.com",
      "ucfid": "123456",
      "gender": "male",
       "paidDues": true,
      "isAdmin": false,
      "custom": "custom"

 }

*/
