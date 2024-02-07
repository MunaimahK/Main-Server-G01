const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    test,
    firstTimeQ,
    discordOAuth

} = require("../Controllers/controllers.js");
router.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  router.get("/", test);
  router.get("/api/auth/discord/dashboard", discordOAuth)
  router.post("/one-time-signup", firstTimeQ);
  module.exports = router;