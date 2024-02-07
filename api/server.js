require("dotenv").config();
const userrouter = require("./Controllers/router1.js");
const oauth = require("./Controllers/discord.js");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const url = require("url");
const cors = require("cors")
const { error } = require("console");
// const port = process.env.PORT || 3001;
const router = express.Router();

// middleware
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use("/", require("./Routes/routes"));

const oauthModel = require("./Models/oauth-model.js");

// -Connect to MongoDB Inlfux-main DB-------------------------------------------------------------------------------------
try {
  const db = mongoose.connect("mongodb://localhost:27017/Influx-main");
  console.log("Connected");
} catch (error) {
  handleError(error);
}

// -DiscordOauth2 Redirect------------------------------------------------------------------------------------------------
app.get("/api/auth/discord/dashboard", async (req, res) => {
  // console.log(req.query);
  const { code } = req.query;
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
});


// -Start the server-------------------------------------------------------------------------------------
app.listen(3001, () => {
  console.log("Server is running");
});
