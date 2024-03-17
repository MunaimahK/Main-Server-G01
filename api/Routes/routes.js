const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  firstTimeQ,
  discordOAuth,
  profile,
  authenticate,
  defaultAdmin,
  assignUID,
  isEnrolled,
  Login,
  Logout,
} = require("../Controllers/controllers.js");
router.use(
  cors({
    credentials: true,
    origin:
      "http://localhost:3000" ||
      "http://localhost:3001" ||
      "http://localhost:3002" ||
      "http://localhost:8000",
  })
);
router.get("/", test);
router.get("/api/auth/discord/dashboard", discordOAuth);
router.post("/one-time-signup", authenticate, firstTimeQ);
router.get("/admin/default", defaultAdmin);
router.get("/assign", assignUID);
router.post("/qrcode");
router.get("/isEnrolled", authenticate, isEnrolled);
router.post("/login", Login);
router.get("/profile", profile);
router.get("/logout", Logout);
/*
router.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.username));
});*/
// router.post("/profile-discord", profile);
module.exports = router;
