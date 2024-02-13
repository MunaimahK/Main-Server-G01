const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  firstTimeQ,
  discordOAuth,
  profile,
  authenticate,
} = require("../Controllers/controllers.js");
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
router.get("/", test);
router.get("/api/auth/discord/dashboard", discordOAuth);
router.post(
  "/one-time-signup",
  authenticate,
  firstTimeQ
); /*
router.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.username));
});*/
// router.post("/profile-discord", profile);
module.exports = router;
