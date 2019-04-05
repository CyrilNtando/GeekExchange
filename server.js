//import express
const express = require("express");
//import mongoose
const mongoose = require("mongoose");
//import body-parser
const bodyParser = require("body-parser");
//import passport
const passport = require("passport");
//get routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//init express
const app = express();
//body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database config
const db = require("./config/keys").mongoURI;

//connect to mongo db through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config or  JWT Strategy
require("./config/passport")(passport);

//use api routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running on port ${port}"));
