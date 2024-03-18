require("dotenv").config();
const url = require("url");
const axios = require("axios");
const Member = require("../Models/member-model.js");
const oauthModel = require("../Models/oauth-model.js");
const Admin = require("../Models/admin-model.js");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { Console } = require("console");
const QRCode = require("qrcode");
const { default: mongoose } = require("mongoose");
const { hashPwd, comparePwd } = require("./helpers/auth.js");

let _uid = 0;
let qrlink = null;
// Test Endpoint
const test = (req, res) => {
  res.json("test is working");
};

// Default Admin Endpoint
const defaultAdmin = async (req, res) => {
  const password = "123456";
  const hashedPwd = await hashPwd(password);
  var count = 0;

  const admin = await Admin.findOne({
    username: "default",
    password: hashedPwd,
  });
  if (!admin) {
    try {
      var defAdmin = new Admin({
        username: "default",
        password: hashedPwd,
      });
      if (count == 0) {
        await defAdmin.save();
        count = 1;
      }
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.json({ error: true });
  }
};

const Login = async (req, res) => {
  try {
    // take the username user logs in with and store in const username
    const { username, password } = req.body;
    console.log(username, password);
    // Check if user exists
    const user = await Admin.findOne({ username });
    if (!user || user === null) {
      console.log("no user");
      return res.json({
        error: "No user found",
      });
    }

    // If user exists, then check passwords match
    const match = await comparePwd(password, user.password);
    console.log("Match: ", match);

    if (match) {
      jwt.sign(
        { username: user.username, id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res
            .cookie("token", token)
            .json(user)
            .status(200);
          res.json("Password Match");
        }
      );
    } else {
      return res.json({
        error: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const Logout = async (req, res) => {
  console.log(req.cookies.token);
  res.clearCookie("token");
  res.status(200).json({ error: true });
};

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

// Discord O Auth endpoint; redirect to dashboard
const discordOAuth = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      res.clearCookie(token);
    }
  } catch (error) {
    console.log(error);
  }

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
        count = 1;
      }

      var data = new oauthModel({
        discordId: userResponse.id,
        username: userResponse.username,
        avatar: userResponse.avatar,
        clubs: null,
        UID: uuid.v4(),
        qrcode: null,
      });
      if (count == 0) {
        try {
          await data.save();
        } catch (error) {
          if (error.code == 11000) {
            console.log(error);
          }
        }
      }

      if (user) {
        // generate JWT Token to encode the current logged in user (user via OAuth)
        // set the token (main server)
        const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        const refreshToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
          })
          .status(200);
        res
          .cookie("refresh_token", refreshToken, {
            httpOnly: true,
          })
          .status(200);
      }
    }
  } else {
    // if the code not retrieved from URL query, then bad authorization request
    return json({
      status: 400,
      error: "An error occured while authorizing. Please try again.",
    });
  }
  if (count == 0) {
    // assignUID(data, res);
    // RESUME LATER
  }
  // console.log(data.UID);
  defaultAdmin(req, res);

  res.redirect(301, "http://localhost:3000/dashboard");
  //}
};

const qrGenerate = async (req, res) => {
  // takes UID from assign functiona and creates QR code base 64
  const uid = req.UID;
  console.log("uid in qrGen ", uid);
  console.log("cookies", req.cookies);
  console.log(req);
  if (!req) {
    console.log("User Id is required");
  }

  const user = await oauthModel.findOne({
    UID: req.UID,
  });
  console.log("User found in qrCode: ", user);
  if (user) {
    const encryptedData = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("encrypted data ", encryptedData);
    const username = user.username;
    console.log(username);

    //  This creates an image on terminal
    /*QRCode.toString("I am a pony!", { type: "terminal" }, function(err, url) {
    console.log(url);
  });*/

    // Figure out how to take it and  put it on page
    const qr = QRCode.toDataURL(encryptedData, function(err, url) {
      qrlink = url;
      return qrlink;
    });
    // does not catch url as object
    console.log(qr);

    /* try this if the qr code in the qrGenerate api doesn't work
    try {
      const response = await axios.get("/updateQR", {
        params: { qrcode: url, user: user },
      });
    } catch (error) {
      console.error(error);
      console.log("Internal Server Error");
    }*/

    /*
    Update qrCode value in schema
    let updatedData = null;
    try {
      updatedData = await oauthModel.findByIdAndUpdate(
        req._id,
        { $set: { qrcode: qr } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
    console.log("updatedData ", updatedData);*/

    // this creates svg image
    /*
    QRCode.toString(
      encryptedData,
      {
        errorCorrectionLevel: "H",
        type: "svg",
      },
      function(err, data) {
        if (err) throw err;
        res.json(data);
      }
    );*/
    // send url to controller user model

    try {
      // console.log("req")
      const response = await axios.get("http://localhost:8000/updateQR", {
        params: req,
      });

      console.log(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      console.log("Internal Server Error");
    }
  }
  //console.log(dataImage);
  //}
};

const assignUID = async (req, res) => {
  const user = await oauthModel.findOne({
    username: req.username,
  });

  console.log("REQ IN ASSIGN:  ", req);

  console.log(req.UID);
  if (user) {
    // embed UID in QRCODE
    console.log("true");
    const qr = qrGenerate(req, res);
  }

  res.redirect(301, "http://localhost:3000/dashboard");
};

// medium API communicating between Influx frontend and Controller backend
const firstTimeQ = async (req, res) => {
  let count;
  const token = req.cookies.access_token;
  // console.log("TOKEN IN FTQ:  ", token);
  const decodedToken = jwt.decode(token);

  // console.log("DECODED TOKEN IN FTQ:  ", decodedToken.UID);
  // gather name, major, and grad date from request body coming from forntend axios.get
  // store in data constant as this will be passed onto the cotnroller backend for data storage
  const data = req.body;
  console.log("DATA", data);
  const { name, major, gradDate, clubName } = req.body;
  /*console.log(name);
  console.log(major);
  console.log(gradDate);
  console.log(clubName);*/
  try {
    const response = await axios.get(
      "http://localhost:8000/one-time-signup-server",
      {
        params: {
          data: data,
          UID: decodedToken.UID,
          name: name,
          major: major,
          gradDate: gradDate,
          clubName: clubName,
        },
      }
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  if (req.clubs == null) {
    const user = await oauthModel
      .findOneAndUpdate({
        discordId: decodedToken.discordId,
        username: decodedToken.username,
        avatar: decodedToken.avatar,
        clubs: clubName,
        UID: decodedToken.UID,
        qrcode: null,
      })
      .where(decodedToken._id);

    /*res.clearCookie();
    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
      })
      .status(200);
    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
      })
      .status(200);

    console.log("updated:  ", updatedData);*/
  }
};

const authenticate = async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    // console.log("AUTHENTICATE:   ", req);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("TOKEN EXPIRED");
      token = req.cookies.refresh_token;
      user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      console.log("AUTHENTICATE:   ", req.user);
    }
    res.clearCookie(token);
    console.log(error);
    res.send(req.user);
  }
};

const isEnrolled = async (req, res, next) => {
  console.log("IS ENROLLED:  ", req.user.UID);

  const member = await oauthModel.findOne({
    UID: req.user.UID,
  });
  console.log("member:  ", member);
  if (member) {
    console.log("IS ENROLLED CLUB:  ", member.clubs);

    console.log("member:  ", member);

    if (member) {
      res.json({
        error: true,
        clubName: member.clubs,
      });
    } else {
      res.json({
        error: false,
      });
    }
  } else {
    res.json({
      error: false,
    });
  }
};

// Login Endpoint;endpoint connected to route in LoginOut.js

module.exports = {
  test,
  firstTimeQ,
  discordOAuth,
  authenticate,
  defaultAdmin,
  assignUID,
  qrGenerate,
  isEnrolled,
  Login,
  profile,
  Logout,
};
