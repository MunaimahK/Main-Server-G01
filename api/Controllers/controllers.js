require("dotenv").config();
const url = require("url");
const axios = require("axios");
const Member = require("../Models/member-model.js");
const oauthModel = require("../Models/oauth-model.js");
const U = require("../Models/oauth-model-update.js");
const Admin = require("../Models/admin-model.js");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { Console } = require("console");
const QRCode = require("qrcode");
const { default: mongoose } = require("mongoose");
const { hashPwd, comparePwd } = require("./helpers/auth.js");
const cModel = require("../Models/controller-model.js");
const { stat } = require("fs");

let _uid = 0;
let qrlink = null;
// Test Endpoint
const test = (req, res) => {
  res.json({ error: "test is working" });
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
  try {
    const { token } = req.cookies.access_token || req.cookies.refresh_token;
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
  } catch (err) {
    console.log(err);
  }
};

// Discord O Auth endpoint; redirect to dashboard
const discordOAuth = async (req, res) => {
  // HUGE ISSUE; TOKENS DON;T REFRESH WHICH BREAKS IMPLEMENTATION LATER
  try {
    const token = req.cookies.access_token;
    if (token) {
      res.clearCookie(token);
      console.log("cleared");
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
      const user = await U.findOne({
        username: userResponse.username,
      });

      var count = 0;
      if (user) {
        count = 1;
      }

      var data = new U({
        discordId: userResponse.id,
        username: userResponse.username,
        avatar: userResponse.avatar,
        UID: uuid.v4(),
        qrcode: null,
      });
      if (count == 0) {
        try {
          await data.save();
          const accessToken = jwt.sign(data.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          const refreshToken = jwt.sign(data.toJSON(), process.env.JWT_SECRET, {
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

          /*const user1 = await U.findOneAndUpdate({
            $push: {
              clubs: { clubName: "Test" },
            },
          }).where(jwt.decode(accessToken)._id);*/
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

        /*const user1 = await U.findOneAndUpdate({
          $push: {
            clubs: { clubName: "Test" },
          },
        }).where(jwt.decode(accessToken)._id);*/
      }
    }

    /*if (userResponse) {
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
    }*/
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

const logoutMain = async (req, res) => {
  console.log(req.cookies.access_token);
  console.log(req.cookies.refreshToken_token);
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json({ error: true });
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
  // these are the general questions:
  // First Name
  // Surname
  // Preferred Email
  // NID
  // Gender
  // Major
  // Class Standing (by credit hours)

  let count;
  const token = req.cookies.access_token;
  const decodedToken = jwt.decode(token);

  // console.log("DECODED TOKEN IN FTQ:  ", decodedToken.UID);
  // gather name, major, and grad date from request body coming from forntend axios.get
  // store in data constant as this will be passed onto the cotnroller backend for data storage
  /*  f_name,
  surname,
  email,
  NID,
  Gender,
  major,
  classStanding,
  backend_url,
  frontend_url, */

  const {
    f_name,
    surname,
    email,
    NID,
    Gender,
    major,
    classStanding,
    clubTitle,
  } = req.body;
  const frontend_url = req.body.frontend_url;
  const backend_url = req.body.backend_url;

  try {
    const response = await axios.get(
      // "http://localhost:8000/one-time-signup-server",
      `${req.body.backend_url}/one-time-signup-server`,
      {
        params: {
          UID: decodedToken.UID,
          f_name,
          surname,
          email,
          NID,
          Gender,
          major,
          classStanding,
        },
      }
    );

    if (req.clubs == null) {
      const user = await U.findOneAndUpdate({
        $push: {
          clubs: {
            clubName: clubTitle,
            redirect: frontend_url,
            redirect_b: backend_url,
          },
        },
      }).where(decodedToken._id);

      console.log("USER ARRAY CLUB: ", user.clubs);
      console.log("USER ARRAY CLUB clubname: ", user.clubs.clubName);
      res.json(response.data);
      console.log(response.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  /*
  const data = req.body;
  console.log("DATA", data);
  const { name, major, gradDate, clubtitle, redirect } = req.body;
  const clubTitle = req.body.clubTitle;
  console.log("REDIRECT URL: ", req.body.backend_url);
  const frontend_url = req.body.frontend_url;
  const backend_url = req.body.backend_url;
  console.log("clubTitle: ", clubTitle);
  try {
    const response = await axios.get(
      // "http://localhost:8000/one-time-signup-server",
      `${req.body.backend_url}/one-time-signup-server`,
      {
        params: {
          data: data,
          UID: decodedToken.UID,
          name: name,
          major: major,
          gradDate: gradDate,
          clubName: clubTitle,
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
    const user = await U.findOneAndUpdate({
      $push: {
        clubs: {
          clubName: clubTitle,
          redirect: frontend_url,
          redirect_b: backend_url,
        },
      },
    }).where(decodedToken._id);

    console.log("USER ARRAY CLUB: ", user.clubs);
    console.log("USER ARRAY CLUB clubname: ", user.clubs.clubName);
  }*/
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

  const member = await U.findOne({
    UID: req.user.UID,
  });

  const test = await U.findOne({
    UID: req.user.UID,
  });
  console.log("member:  ", member);
  console.log("member:  ", test);
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

const checkDues = async (req, res, next) => {
  try {
    console.log("CHECK DUES API:  ", req.user.UID);
    console.log("IS ENROLLED IN:  ", req.user.clubs);
  } catch (err) {
    //  console.log(req);
    console.log("Err");
  }
  try {
    const clubName = req.body.clubName;
    console.log("ClubName", clubName);
  } catch (err) {
    console.log("Err in clubname from rew");
  }

  try {
    const clubName = req.body.clubName;
    console.log("ClubName", clubName);
    const club = await U.find({
      "clubs.clubName": { $regex: { clubName: clubName }, $options: "i" },
    });

    console.log(club);
  } catch (err) {
    console.log(err);
    console.log("Err in club find by regex");
  }

  /*
  const member = await oauthModel.findOne({
    UID: req.user.UID,
  });
  */
  res.json({
    error: false,
  }); /*
  const member = await U.findOne({
    UID: req.user.UID,
  });
  console.log("member:  ", member);
  if (member) {
    console.log("IS ENROLLED CLUB:  ", member.clubs);

    console.log("member:  ", member);

    if (member) {
      try {
        const response = await axios.get("http://localhost:8000/dues-status", {
          params: {
            UID: decodedToken.UID,
          },
        });
        res.json(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.json({
        error: false,
      });
    }
  } else {
    res.json({
      error: false,
    });
  }*/
};
// Login Endpoint;endpoint connected to route in LoginOut.js

const retrieveCQ = async (req, res) => {
  const red_url = req.query.backend_url;
  console.log("RED_URL: ", red_url);
  let questionArrayFromController = [];
  try {
    const data = await axios
      .get(`${red_url}/custom-questions`, {
        params: req.query,
      })
      // .get("http://localhost:8000/custom-questions")
      .then((res) => {
        console.log("ERROR FROM CONTROLLER CQ API:", res.data.customquestion);
        questionArrayFromController = res.data.customquestion;
        // res.json({res.data});
      });
    console.log("CHECK BEFORE RES:", questionArrayFromController);
    res.send(questionArrayFromController);
  } catch (err) {
    console.log(err);
    // res.json([{}]);
  }
  // res.json({ stat: "connected", r: red_url });
};

const addToClub = async (req, res) => {
  // res.json({ test: true });
  try {
    console.log(req.body);
    // const { name, frontend, backend, logo, text } = req.body.data;
    const name = req.body.name;
    const frontend = req.body.frontend;
    const backend = req.body.backend;
    const text = req.body.text;
    const logo = req.body.logo;
    console.log(name);
    console.log(frontend);
    console.log(backend);
    console.log(text);
    console.log(logo);

    // three if statements check if form fields are entered
    // toast picks up error body and displays as notification
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!frontend) {
      return res.json({
        error: "frontend url is required",
      });
    }
    if (!backend) {
      return res.json({
        error: "backend url is Required",
      });
    }
    if (!logo) {
      return res.json({
        error: "img url is required",
      });
    }
    if (!text) {
      return res.json({
        error: "club display text is required",
      });
    }

    const exist = await cModel.findOne({ name });
    if (exist) {
      return res.json({
        error: true,
      });
    }

    // create a hashed password using hashPwd helper function
    // const hashedPwd = await hashPwd(password);
    //console.log("Addded");
    // create user with req.body infromation
    const club = cModel.create({
      name,
      frontend,
      backend,
      logo,
      text,
    });

    (await club).save();

    if (cModel.find()) {
      console.log("Addded");
    }
    return res.json(club.name);
  } catch (error) {
    console.log(error);
  }
};

const findControllers = async (req, res) => {
  try {
    const clubs = await cModel.find();
    if (clubs) {
      // console.log("CLUBS: ", clubs);
      res.json(clubs);
    } else {
      res.json({});
    }
  } catch (err) {
    console.log(err);
  }
};

const checkDuePayment = async (req, res) => {
  let count;
  const token = req.cookies.access_token;
  // console.log("TOKEN IN FTQ:  ", token);
  const decodedToken = jwt.decode(token);

  // console.log("DECODED TOKEN IN FTQ:  ", decodedToken.UID);
  // gather name, major, and grad date from request body coming from forntend axios.get
  // store in data constant as this will be passed onto the cotnroller backend for data storage
  const redirect = req.body.redirect_b;
  console.log("DATA", redirect);
  /*console.log(name);
  console.log(major);
  console.log(gradDate);
  console.log(clubName);*/
  try {
    const response = await axios.get(
      // "http://localhost:8000/one-time-signup-server",
      `${redirect}/paid-dues-check`,
      {
        params: {
          UID: decodedToken.UID,
          TOKEN: token,
        },
      }
    );
    console.log("790:", response.data);
    res.json({ paidDues: response.data });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendAnswers = async (req, res) => {
  // receive backend url to point to (determines which controller to forward)
  const redirect = req.query.backend_url.toString();
  // retrieve the array of questions with updated answers
  const submit = req.query.questions;
  let token = {};
  try {
    token = jwt.decode(req.cookies.access_token);
  } catch (err) {
    console.log(err);
  }

  console.log("DATA in SEND ANSWERS", redirect);
  console.log("Answers received:", submit);
  //send the array to the controller to push the aray onto member user document in customQ array field
  try {
    const response = await axios
      .get(`${redirect}/update-answers`, {
        params: {
          submit,
          token,
        },
      })
      .then((res) => {
        console.log("FROM CONTROLLER:", res);
      });
  } catch (error) {
    console.error(error);
  }

  res.json({ msg: true });
};

const borrowGeneral = async (req, res) => {
  console.log("borrow");
  const borrowFrom = req.query.borrowFrom;
  const isBorrowing = req.query.isBorrowing;
  console.log(borrowFrom, isBorrowing);
  const UID = jwt.decode(req.cookies.access_token).UID;
  const id = jwt.decode(req.cookies.access_token)._id;
  // first retrieve user from borrowFrom db
  try {
    const borrowingUserfromClub = await axios
      .get(`${borrowFrom}/lend-user`, {
        params: { UID, id },
      })
      .then(async (res) => {
        console.log("IN BORROW GENERAL FROM LEND:", res.data.msg);
        const f_name = res.data.msg.f_name;
        const surname = res.data.msg.surname;
        const email = res.data.msg.email;
        const NID = res.data.msg.NID;
        const Gender = res.data.msg.Gender;
        const major = res.data.msg.major;
        const classStanding = res.data.msg.classStanding;
        console.log(
          "IN BORROW GENERAL FROM LEN TEST:",
          f_name,
          surname,
          email,
          NID,
          Gender,
          major,
          classStanding
        );

        const send = await axios
          .get(`${isBorrowing}/take-general`, {
            params: {
              f_name,
              surname,
              email,
              NID,
              Gender,
              major,
              classStanding,
              UID,
              id,
            },
          })
          .then((res) => {
            console.log(res.data.msg);
          });
      });
  } catch (err) {
    console.log(err);
  }
  res.json({ msg: true });
};
const updateCArray = async (req, res) => {
  const decode = jwt.decode(req.cookies.access_token);
  try {
    const newClub = req.query.newC;
    const frontend_url = req.query.frontend_url;
    const backend_url = req.query.backend_url;

    console.log(newClub, frontend_url, backend_url);

    const updatedClubs = await U.findOneAndUpdate({
      $push: {
        clubs: {
          clubName: newClub,
          redirect: frontend_url,
          redirect_b: backend_url,
        },
      },
    }).where(decode._id);

    console.log(updatedClubs);
  } catch (err) {
    console.log(err);
  }
  console.log("IN C[]");
  res.json({ msg: "true in updatecAR" });
};

const checkDuesForStats = async (req, res) => {
  const redirect_b = req;
  let status = false;
  const token = req.cookies.access_token;
  // console.log("TOKEN IN FTQ:  ", token);
  const decodedToken = jwt.decode(token);
  console.log("url IN CHECK DUES FOR STATS:", req.query.b_url);
  try {
    const borrowingUserfromClub = await axios
      .get(`${req.query.b_url}/paid-dues-check`, { params: { token } })
      .then(async (res) => {
        console.log("RES IN CHECK DUES FOR STATS:", res.data);
        status = res.data.paidDues;
      });
    res.json({ msg: status });
  } catch (err) {
    console.log(err);
  }
};
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
  checkDues,
  retrieveCQ,
  logoutMain,
  addToClub,
  findControllers,
  checkDuePayment,
  sendAnswers,
  borrowGeneral,
  updateCArray,
  checkDuesForStats,
};
