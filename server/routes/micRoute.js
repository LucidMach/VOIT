const express = require("express");
const reqAuth = require("../middleware/authMW");

const applet = express.Router();

applet.get("/", reqAuth.jwtAuth, (req, res) => {
  res.render("mic");
});

module.exports = applet;
