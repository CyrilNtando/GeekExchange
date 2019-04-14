//get express router
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//Post model
const Post = require("../../models/Post");
//profile model
const Profile = require("../../models/Profile");
//validation
const validatePostInput = require("../../validation/post");

//@route   GET api/posts
//@desc   Get posts
//@acess    Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No post found" }));
});
//@route   GET api/posts/:id
//@desc   Get post
//@acess    Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});
//@route    POST api/posts
//@desc    create post
//@acess    Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //If any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@route  DELETE api/posts/:id
//@desc   DElete post
//@acess   private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        //check for owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //delete

        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    });
  }
);

//@route POST api/posts/like/:id
//@desc   like post
//@acess   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User alredy liked this post" });
        }
        //Add user id to likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      });
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc   Unlike post
//@acess   private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this Post" });
          }
          //Get remove Index
          const removeIndex = post.likes
            .map(item => {
              return item.user.toString();
            })
            .indexOf(req.user.id);
          //splice out of the array
          post.likes.splice(removeIndex, 1);
          //save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.json({ notliked: "You have not yet liked this Post" })
        );
    });
  }
);

//@route   POST api/posts/comment/:id
//@desc    Add commet to post
//@acess   private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //If any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comment Array
        post.comments.unshift(newComment);

        //Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Delete comment from post
//@acess   private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist " });
        }

        //Get remove index
        const removeIndex = post.comments
          .map(item => item.id.toString())
          .indexOf(req.params.comment_id);

        //Splice cooment out of array
        post.comments.splice(removeIndex, 1);
        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
clearImmediate;
