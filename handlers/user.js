const db = require("../models");
const keys = require("../config/keys");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

//Load User Validations
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.logIn = async function(req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    //Return any errors with 400 status
    return next({
      status: 400,
      message: errors
    });
  }
  try {
    const { email, password } = req.body;
    let user = await db.User.findOne({ email });
    //if user not found

    if (!user) {
      const email = {
        email: "User not found"
      };
      return next({
        status: 404,
        message: email
      });
    }
    //check if password correct
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      //create JWT payload
      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      //sign token
      let token = jwt.sign(payload, keys.secretKey, { expiresIn: 7600 });
      return res.json({
        success: true,
        token: "Bearer " + token
      });
    } else {
      //if password did not match
      return next({
        status: 404,
        message: "Password is incorrect"
      });
    }
  } catch (error) {
    next({
      message: "Please enter correct Password or Email"
    });
  }
};

//create a new User
exports.register = async function(req, res, next) {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    //Return any errors with 400 status
    return next({
      status: 400,
      message: errors
    });
  }
  try {
    let user = await db.User.findOne({ email: req.body.email });
    //if email already exists
    if (user) {
      return next({
        status: 400,
        message: "email already exists"
      });
    }
    //get/create default profile pic
    const avatar = await gravatar.url(req.body.email, {
      s: "200", //size
      r: "pg", //rating
      d: "mm" // default
    });
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    return res.status(200).json(newUser);
  } catch (error) {
    return next(error);
  }
};
exports.currentUser = async function(req, res, next) {
  try {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    next(error);
  }
};
