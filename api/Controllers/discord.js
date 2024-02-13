require("dotenv").config();
const usermodel = require("../Models/member-model.js");
const express = require("express");
const router = express.Router();
const url = require("url");
const axios = require("axios");

//console.log(process.env.ClientID);

/*
// -Discord OAuth2 Routes-------------------------------------------------------------------------------------
router.get("influx/auth/login", async (req, res) => {
  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1179068530273034290&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email";
  return res.redirect(url);
});
router.get("/api/auth/discord/redirect", async (req, res) => {
  const { code } = req.query;

  if (code) {
    const formData = new url.URLSearchParams({
      client_id: process.env.ClientID,
      client_secret: process.env.ClientSecret,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: "http://localhost:3001/api/auth/discord/redirect",
    });
  }

  const output = await axios.post(
    "https://discord.com/api/oauth2/token",
    //"/discord.com/api/oauth2/token",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (output.data) {
    const access = output.data.access_token;
    const userInfo = await axios.get("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });

    console.log(output.data, userInfo.data);
  }
});
*/
module.exports = router;
