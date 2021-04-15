const express = require("express");
const commandController = require("../controllers/commandController");

const applet = express.Router();

applet.post("/", commandController.postCommand);
applet.get("/", commandController.getCommand);

module.exports = applet;
