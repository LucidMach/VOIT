const express = require("express");
const signinController = require("../controllers/signinController");

const applet = express.Router();

applet.get("/", signinController.getSignin);
applet.post("/signup", signinController.postSignUp);
applet.post("/login", signinController.postLogIn);
applet.get("/logout", signinController.getLogOut);

module.exports = applet;
