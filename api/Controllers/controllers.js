require("dotenv").config();
const url = require("url");
const axios = require("axios");
const Member = require("../Models/member-model.js");
const oauthModel = require("../Models/oauth-model.js");
const jwt = require("jsonwebtoken");

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

      // check if user exists, if so, set counter to ignore it
      const user = await oauthModel.findOne({
        username: userResponse.username,
      });

      var count = 0;
      if (user) {
        /*
        res.status(201).json({
          _id: user.id,
          discordId: user.discordId,
          username: user.username,
          avatar: user.avater,
          clubs: user.clubs,
          token: generateToken(user.discordId),
        });*/
        // console.log(token);
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

      // generate JWT Token to encode the current logged in user (user via OAuth)
      const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        })
        .status(200);
    }
  } else {
    // if the code not retrieved from URL query, then bad authorization request
    return json({
      status: 400,
      error: "An error occured while authorizing. Please try again.",
    });
  }

  res.redirect(301, "http://localhost:3000/dashboard");
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403);
    }
    req.user = user;
    next();
  });
}

// medium API communicating between Influx frontend and Controller backend
const firstTimeQ = async (req, res) => {
  // how to decide which club is first time? use props.title
  // set a tag and based on tag, create if else structure to choose which url to pass to

  // gather name, major, and grad date from request body coming from forntend axios.get
  // store in data constant as this will be passed onto the cotnroller backend for data storage
  const data = req.body;
  const { name, major, gradDate, title } = req.body;
  console.log(name);
  try {
    const response = await axios.get(
      "http://localhost:8000/one-time-signup-server",
      { params: data }
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  /* try {
    try {
      if (title == "Knight Hacks") {
        try {
          const response = await axios.get(
            "http://localhost:8000/one-time-signup-server",
            { params: data }
          );
          res.json(response.data);
        } catch (error) {
          console.error(error);
        }
      } else if (title == "Hack@UCF") {
        // call API from HACH@UCF Backend
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    //  console.log(error);
  }*/
  // console.log("Model", oauthModel.findById({ discordId: this.discordID }));

  // then update Inlfux main server user "clubs" string to include this club
  // how to know which club, use tag used to discern the url
  // oauthModel.update({ clubs: title });

  // await oauthModel.findByIdAndUpdate(req.discordId);
};
/*
// use for user profile from oauth
const profile = (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log("here");
      res.json(user);
    });
  } else {
    res.json(null);
  }
};
*/
const authenticate = async (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400);
    //res.clearCookie("access_token");
    //res.cookie(null);
    // console.log(req.cookies.access_token);
    // token = req.cookies.access_token;
    /* if (!token) {
      console.log("here");
      res.redirect(301, "http://localhost:3000/");
    }*/
  }
  /*
  let token;
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (authHeader) {
    console.log(authHeader);
    try {
      token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(404);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await oauthModel.findById(decoded.discordId);
      next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.status(401);
  }*/
};
module.exports = {
  test,
  firstTimeQ,
  discordOAuth,
  authenticate,
};
