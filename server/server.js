// env var
console.log(process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === "dev" ? true : false;
const port = process.env.PORT || 5000;

// depencencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
// dev dependencies
if (isDev) {
  const morgan = require("morgan");
}
// imports
const signinRoute = require("./routes/signinRoute");
const micRoute = require("./routes/micRoute");
const commandRoute = require("./routes/commandRoute");

// initializations
dotenv.config();
const app = express();
// middleware
app.use(express.json());
if (isDev) app.use(morgan("dev"));
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
    app.listen(port);
    console.log(port);
  })
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => {
  res.render("mic");
});
app.use("/signin", signinRoute);
app.use("/mic", micRoute);
app.use("/command", commandRoute);
