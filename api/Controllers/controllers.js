const User = require("../Models/user-model.js");
require("dotenv").config();
const test = (req, res) => {
  res.json("test is working");
};
require("dotenv").config();

const firstTimeQ = async (req, res) => {
    try {
      // rename req.body information sent by user
      const { name, major, gradDate } = req.body;
      // three if statements check if form fields are entered
      // toast picks up error body and displays as notification
      if (!name) {
        return res.json({
          error: "Name is required",
        });
      }
      if (!major) {
        return res.json({
          error: "major is required",
        });
      }
      if (!gradDate) {
        return res.json({
          error: "Grad Date Required",
        });
      }
  
      const exist = await User.findOne({ name });
      if (exist) {
        return res.json({
          error: "User (Name) Exists",
        });
      }
  
      // create a hashed password using hashPwd helper function
     // const hashedPwd = await hashPwd(password);
  
      // create user with req.body infromation
      const user = User.create({
        name,
        major,
        gradDate
      });
  
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = {
    test,
    firstTimeQ
  }