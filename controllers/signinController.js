const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  let errors = { error: "" };
  if (err.code === 11000) {
    errors.error = "EmailID already in use";
    return errors;
  }
};

module.exports.getSignin = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    res.redirect("/signin/logout");
  } else {
    res.render("signin");
  }
};
module.exports.postSignUp = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const hashpass = await bcrypt.hash(data.pass, 10);
    const user = await User.create({ email: data.mail, password: hashpass });
    const token = await jwt.sign({ id: user._id }, "the will of fire", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    // console.log(user);
    res.status(201).json(user);
  } catch (err) {
    const error = handleError(err);
    res.status(400).json(error);
  }
};

module.exports.postLogIn = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const user = await User.findOne({ email: data.mail });
    // console.log(user);
    if (user) {
      // console.log(data.pass);
      const auth = await bcrypt.compare(data.pass, user.password); // 1st argument doesnt have to be hashed
      // console.log(auth);
      if (auth) {
        const token = jwt.sign({ id: user._id }, "the will of fire", {
          expiresIn: 3 * 24 * 60 * 60,
        });
        res.cookie("jwt", token);
        res.status(201).json({ user: "SUCCESS" });
      } else {
        res.status(400).json({ user: "PASSWORD" });
      }
    } else {
      res.status(400).json({ user: "EMAIL" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.getLogOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
