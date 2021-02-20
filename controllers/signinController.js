const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
  let errors = { error: "" };
  if (err.code === 11000) {
    errors.error = "EmailID already in use";
    return errors;
  }
};

module.exports.getSignin = (req, res) => {
  res.render("signin");
};
module.exports.postSignUp = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create({ email: data.mail, password: data.pass });
    const token = await jwt.sign({ id: user._id }, "the will of fire", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    const error = handleError(err);
    res.status(400).json(error);
  }
};
module.exports.postLogIn = async (req, res) => {
  const data = req.body;
};
