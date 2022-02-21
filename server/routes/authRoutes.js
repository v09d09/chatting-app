// add secure to cookie config on production
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", gGetInfoController);
router.post("/login", gLoginController);
router.post("/logout", gLogoutController);

module.exports = router;

function gGetInfoController(req, res) {
  if (!req.cookies.token) {
    return res.status(200).json({ status: "fail", message: "not logged in" });
  }
  const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  res
    .status(200)
    .json({ status: "success", user: token, token: req.cookies.token });
}

function gLoginController(req, res) {
  if (req.cookies.token)
    return res.status(400).json({ message: "ERR: already logged in" });
  const { username } = req.body;
  if (
    !username ||
    username.length < 4 ||
    username.length > 25 ||
    typeof username !== "string"
  ) {
    return res.status(400).json({
      message:
        "Error: username has to be at least 4 letters and at most 25 letters",
    });
  }

  const uid = username + `#${randInt(1000000, 9999999)}`;
  const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  res
    .status(201)
    .json({ message: "Successfully created token", token, username, uid });
}

function gLogoutController(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
}

// util functions
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
