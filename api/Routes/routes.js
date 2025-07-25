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
  totalController,
  totalAdmins,
  checkEnrollmentPriorToRedirect,
  isEnrolledClub,
} = require("../Controllers/controllers.js");
router.use(
  cors({
    credentials: true,
    origin:
      "http://localhost:3000" ||
      "http://localhost:3001" ||
      "http://localhost:3002" ||
      "http://localhost:3003" ||
      "http://localhost:8000" ||
      "http://localhost:8001" ||
      "http://localhost:8002",
  })
);
// router.options("*", cors());
router.get("/", test);
router.get("/api/auth/discord/dashboard", discordOAuth);
router.post("/one-time-signup", authenticate, firstTimeQ);
router.get("/admin/default", defaultAdmin);
router.get("/assign", assignUID);
router.post("/qrcode");
router.get("/isEnrolled", authenticate, isEnrolled);
router.get("/isEnrolledClub", authenticate, isEnrolledClub);
router.post("/login", Login);
router.get("/profile", profile);
router.get("/logout", Logout);
router.get("/check-dues", authenticate, checkDues);
router.get("/retrieve-custom-q", authenticate, retrieveCQ);
router.get("/logout/influx", logoutMain);
router.post("/add-new-club", addToClub);
router.get("/controllers", findControllers);
router.get("/check-due-payment", checkDuePayment);
router.get("/update-answers-send", sendAnswers);
router.get("/borrow-general-questions", borrowGeneral);
router.get("/update-clubs-enrolled", updateCArray);
router.get("/check-stats-per-club", checkDuesForStats);
router.get("/total/clubs", totalController);
router.get("/total/admins", totalAdmins);
router.get("/check/enrolled/club/redirect", checkEnrollmentPriorToRedirect);
router.get("/test/test", (req, res) => {
  res.send("This is a test endpoint");
});
// router.get("/check/first/time/enrolled", checkFirstEnrollment);

/*
router.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.username));
});*/
// router.post("/profile-discord", profile);
module.exports = router;
