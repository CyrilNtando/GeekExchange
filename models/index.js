const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

const dbPass = require("../config/keys").mongoURI;
//connect to database
mongoose
  .connect(dbPass, { useNewUrlParser: true })
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

module.exports.User = require("./User");
module.exports.Profile = require("./Profile");
module.exports.Post = require("./Post");
