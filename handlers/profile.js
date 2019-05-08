const db = require("../models");
const ProfileFields = require("./profileFields");
//Load Validations
const validatorProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
/************************
 *  PROFILE
 ***************************/
exports.getUserProfile = async function(req, res, next) {
  try {
    let profile = await db.Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return next({
        status: 404,
        message: "The is no profile for this User"
      });
    }
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
};
exports.getAllProfiles = async function(req, res, next) {
  try {
    let profiles = await db.Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return next({
        status: 404,
        message: "The are no profiles"
      });
    }
    return res.status(200).json(profiles);
  } catch (error) {
    return next(error);
  }
};
exports.getProfileByHandle = async function(req, res, next) {
  try {
    let profile = await db.Profile.findOne({
      handle: req.params.handle
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return next({
        status: 404,
        message: "The is no profile for this user"
      });
    }
    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
};
exports.getProfileById = async function(req, res, next) {
  try {
    let profile = await db.Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return next({
        status: 404,
        message: "The is no profile for this User"
      });
    }
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
exports.createUserProfile = async function(req, res, next) {
  const { errors, isValid } = validatorProfileInput(req.body);
  //check validation
  if (!isValid) {
    //Return any errors with 400 status
    return next({
      status: 400,
      message: errors
    });
  }
  //initialize profile fields
  //Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  //Skills -Split into Array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }
  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  try {
    let profile = await db.Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await db.Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    } else {
      /** Create a new Profile**/
      //check if handle exits
      profile = await db.Profile.findOne({
        handle: profileFields.handle
      });
      if (profile) {
        return next({
          status: 400,
          message: "That handle already exists"
        });
      }
      //Create
      profile = await db.Profile.create(profileFields);
      return res.status(200).json(profile);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProfile = async function(req, res, next) {
  try {
    let profile = await db.Profile.findOne({ user: req.user.id });
    await profile.remove();
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
/************************
 *  EXPRIENCE
 ***************************/

exports.addExprience = async function(req, res, next) {
  const { errors, isValid } = validateExperienceInput(req.body);
  //check Validation
  if (!isValid) {
    return next({
      status: 400,
      message: errors
    });
  }

  try {
    let profile = await db.Profile.findOne({ user: req.user.id });
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    console.log(req.body.description);
    //add to exp array
    profile.experience.unshift(newExp);
    //Save Profile
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.deleteExprience = async function(req, res, next) {
  try {
    let profile = await db.Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    //Splice out of array
    profile.experience.splice(removeIndex, 1);
    //Resave
    await profile.save();
    //return new profile
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
/************************
 *  EDUCATION
 ***************************/

exports.addEducation = async function(req, res, next) {
  const { errors, isValid } = validateEducationInput(req.body);
  //check Validation
  if (!isValid) {
    return next({
      status: 400,
      message: errors
    });
  }
  try {
    let profile = await db.Profile.findOne({ user: req.user.id });
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    //add to exp array
    profile.education.unshift(newEdu);
    //save education
    await profile.save();
    //return updated profile
    return res.json(profile);
  } catch (error) {
    next(error);
  }
};

exports.deleteEducation = async function(req, res, next) {
  try {
    let profile = await db.Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    //Splice out of array
    profile.education.splice(removeIndex, 1);
    //Resave
    await profile.save();
    return res.json(profile);
  } catch (error) {
    next(error);
  }
};
