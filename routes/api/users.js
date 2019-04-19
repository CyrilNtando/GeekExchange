//get express router
const express = require("express");
const router = express.Router();
const passport = require("passport");

//get user handlers
const { logIn, register, currentUser } = require("../../handlers/user");
//create user routes
router.post("/login", logIn);

router.post("/register", register);
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  currentUser
);
module.exports = router;
