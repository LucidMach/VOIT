const jwt = require("jsonwebtoken");

module.exports.jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "the will of fire", (err, decodedToken) => {
      if (err) {
        res.redirect("/signin");
      }
      console.log(decodedToken);
      next();
    });
  } else {
    res.redirect("/signin");
  }
};
