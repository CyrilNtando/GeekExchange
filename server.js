//import express
const express = require("express");
//import mongoose
const mongoose = require("mongoose");

//get routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
//init express
const app = express();
//database config
const db = require("./config/keys").mongoURI;

//connect to mongo db through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

//default route
app.get("/", (req, res) => {
  res.send("Hello wrold");
});

//use api routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running on port ${port}"));
