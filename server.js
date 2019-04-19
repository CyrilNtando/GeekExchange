//import express
const express = require("express");
//import body-parser
const bodyParser = require("body-parser");
//import passport
const passport = require("passport");
const errorHandler = require("./handlers/errorHandler");

//init express
const app = express();
//body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//get routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//initialize Passport Middleware
app.use(passport.initialize());
//Passport Config or  JWT Strategy
require("./config/passport")(passport);
//use api routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
//router not found
app.use(function(req, res, next) {
  let err = new Error("Route Not Found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
