require("dotenv").config();
const userrouter = require("./Controllers/router1.js");
const oauth = require("./Controllers/discord.js");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const url = require("url");
const cors = require("cors");
const { error } = require("console");
const cookieParser = require("cookie-parser");
const router = express.Router();
const Admin = require("./Models/admin-model.js");

const port = process.env.PORT || 3001;

async function ensureDefaultAdmin() {
  const password = "123456";

  const existingAdmin = await Admin.findOne({ username: "default" });

  if (!existingAdmin) {
    try {
      const defAdmin = new Admin({
        username: "default",
        password: password,
      });
      await defAdmin.save();
      console.log("Default admin created.");
    } catch (err) {
      console.error("Failed to create default admin:", err);
    }
  } else {
    console.log("ℹ️ Default admin already exists.");
  }
}


// -Middleware------------------------------------------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin:
      "http://localhost:3000" ||
      "http://localhost:3001" ||
      "http://localhost:8000" ||
      "http://localhost:3002" ||
      "localhost:8000",
    credentials: true,
  })
);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://localhost:3002",
    "localhost:8000",
    "localhost:3000",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", require("./Routes/routes"));

// -Connect to MongoDB Inlfux-main DB-------------------------------------------------------------------------------------
try {
  // mongoose.connect("mongodb://localhost:27017/Influx-main");
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  console.log("Connected");
} catch (error) {
  handleError(error);
} /*
const connectWithRetry = async () => {
  try {
    await mongoose.connect(`mongodb://mongo:27017/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    console.log(process.env.DB_NAME);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    // Retry connection after a delay (e.g., 5 seconds)
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();*/
// -Start the server-------------------------------------------------------------------------------------
app.listen(port, async() => {
  console.log("Server is running");
  console.log(process.env.PORT);
  await ensureDefaultAdmin();
});
