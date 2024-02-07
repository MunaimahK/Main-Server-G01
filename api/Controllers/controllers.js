require("dotenv").config();
const url = require("url");
const axios = require("axios");
const User = require("../Models/user-model.js");
const oauthModel = require("../Models/oauth-model.js");

// Test Endpoint
const test = (req, res) => {
  res.json("test is working");
};

// Discord O Auth endpoint; redirect to dashboard
const discordOAuth = async (req, res) => {
    // Retreive code from query string url
    // Code is used to get an access token
    const { code } = req.query;

    // Exchange code for access token
    if (code) {
        const formData = new url.URLSearchParams({
        client_id: process.env.ClientID,
        client_secret: process.env.ClientSecret,
        grant_type: "authorization_code",
        code: code.toString(),
        redirect_uri: "http://localhost:3001/api/auth/discord/dashboard",
      });
  
      const response = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      const { access_token } = response.data;
      const { data: userResponse } = await axios.get(
        "https://discord.com/api/v10/users/@me",
        {
          headers: {    
            Authorization: `Bearer ${access_token}`,
          },
        }
      );


      if (userResponse) {
        const { id, username, avatar } = userResponse;
        console.log(userResponse.username);
        
        const user = await oauthModel.findOne(
          { username: userResponse.username }
        );
  
        var count = 0;
        if (user) {
          count = 1;
        }
  
        var data = new oauthModel({
          discordId: userResponse.id,
          username: userResponse.username,
          avatar: userResponse.avatar,
          clubs: null,
        });
        if (count == 0) {
          await data.save();
        }
   res.redirect(
          301,
          "http://localhost:3000/dashboard"
        );
      }
    }
    else{
        // if the code not retrieved from URL query, then bad authorization request
        return json({
            status: 400,
            error: 'An error occured while authorizing. Please try again.',
          })
    }
  };

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
    firstTimeQ,
    discordOAuth
  }