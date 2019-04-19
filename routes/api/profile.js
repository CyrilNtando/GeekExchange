//get express router
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getUserProfile,
  getAllProfiles,
  getProfileById,
  getProfileByHandle,
  createUserProfile,
  deleteProfile,
  addExprience,
  deleteExprience,
  addEducation,
  deleteEducation
} = require("../../handlers/profile");

/***** ************
 * PROFILE ROUTES
 * ****************/

//@route    GET api/profile
//@desc     get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);
//@route   get api/profile/all
//@desc     Get all profile
//@acess    Public
router.get("/all", getAllProfiles);
//@route   get api/profile/handle/:handle
//@desc     Get profile by handle
//@acess    Public
router.get("/handle/:handle", getProfileByHandle);
//@route   get api/profile/user/:user_id
//@desc     Get profile by id
//@acess    Public
router.get("/user/:user_id", getProfileById);
//@route    POST api/profile
//@desc     Create or edit user profile
//@acess    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createUserProfile
);

//@route    Delete api/profile
//@desc      Delete user and profile
//@acess     Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteProfile
);

/***** ************
 * EXPRIENCE ROUTES
 * ****************/
//@route    POST api/profile/exprience
//@desc     Add experience
//@acess    Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  addExprience
);
//@route    DELETE api/profile/exprience/:exp_id
//@desc     Delete experience from profile
//@acess    Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  deleteExprience
);

/***** ************
 * EDUCATION ROUTES
 * ****************/
//@route    POST api/profile/education
//@desc     Add education
//@acess    Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  addEducation
);
//@route    Delete api/profile/education/:exp_id
//@desc     Delete education from profile
//@acess    Private
router.delete(
  "/education/:exp_id",
  passport.authenticate("jwt", { session: false }),
  deleteEducation
);
module.exports = router;
