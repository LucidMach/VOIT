const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// dev dependencies
const morgan = require("morgan");

// imports
const signinRoute = require("./routes/signinRoute");
const micRoute = require("./routes/micRoute");

// initializations
dotenv.config();
const app = express();
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database
const mUrl = process.env.mDB;
mongoose
  .connect(mUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/signin", signinRoute);
app.use("/mic", micRoute);
