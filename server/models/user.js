const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: [true, "Your email is already registered."],
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
