const port = process.env.PORT || 5000;

// depencencies
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
// imports
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

// routes
app.get("/", (req, res) => {
  res.redirect("/mic");
});
// app.use("/signin", signinRoute);
app.use("/mic", micRoute);
app.use("/command", commandRoute);

app.listen(port, () => {
  console.log(port);
});
