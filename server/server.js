const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
// dev dependencies
const morgan = require("morgan");

// imports
const signinRoute = require("./routes/signinRoute");
const micRoute = require("./routes/micRoute");
const commandRoute = require("./routes/commandRoute");

// initializations
dotenv.config();
const app = express();
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join("server", "public")));
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

// app.listen(process.env.PORT || 3000);

// routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/signin", signinRoute);
app.use("/mic", micRoute);
app.use("/command", commandRoute);
