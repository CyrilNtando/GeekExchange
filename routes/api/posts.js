//get express router
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getAllPost,
  createPost,
  deletePost,
  getPostById,
  likePost,
  unlikePost,
  addCommentToPost,
  deleteCommentFromPost
} = require("../../handlers/posts");

//@route   GET api/posts
//@desc   Get posts
//@acess    Public
router.get("/", getAllPost);
//@route   GET api/posts/:id
//@desc   Get post
//@acess    Public
router.get("/:id", getPostById);
//@route    POST api/posts
//@desc     create post
//@acess    Private
router.post("/", passport.authenticate("jwt", { session: false }), createPost);
//@route  DELETE api/posts/:id
//@desc   DElete post
//@acess   private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
/**********************
 * LIKES
 **********************/
//@route POST api/posts/like/:id
//@desc   like post
//@acess   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);
//@route POST api/posts/unlike/:id
//@desc   Unlike post
//@acess   private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  unlikePost
);
/**********************
 * COMMENT
 **********************/
//@route   POST api/posts/comment/:id
//@desc    Add comment to post
//@acess   private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  addCommentToPost
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Delete comment from post
//@acess   private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  deleteCommentFromPost
);

module.exports = router;
clearImmediate;
