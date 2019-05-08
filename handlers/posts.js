const db = require("../models");

/**********************
 * POSTS
 **********************/
//validation
const validatePostInput = require("../validation/post");
exports.getAllPost = async function(req, res, next) {
  try {
    let posts = await db.Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    next(error);
  }
};
exports.getPostById = async function(req, res, next) {
  try {
    let post = await db.Post.findById(req.params.id);
    if (post) return res.json(post);
    next({
      status: 400,
      message: "No post Found"
    });
  } catch (error) {
    next(error);
  }
};
exports.createPost = async function(req, res, next) {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    //If any errors send 400 with errors object
    return next({
      status: 400,
      message: errors
    });
  }
  try {
    let newPost = await db.Post.create({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    return res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};
exports.deletePost = async function(req, res, next) {
  try {
    let post = await db.Post.findById(req.params.id);
    if (post) {
      if (post.user.toString() !== req.user.id) {
        return next({
          status: 401,
          message: "User is not authorized"
        });
      }
    }
    await post.remove();
    return res.status(200).json({ sucess: true });
  } catch (error) {
    next(error);
  }
};
/**********************
 * LIKES
 **********************/

exports.likePost = async function(req, res, next) {
  try {
    let post = await db.Post.findById(req.params.id);
    if (post) {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return next({
          status: 400,
          message: "User already liked this Post"
        });
      }
      //Add user id to likes array
      post.likes.unshift({ user: req.user.id });
      await post.save();
      return res.json(post);
    } else {
      return next({
        status: 400,
        message: "Post does not exists"
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.unlikePost = async function(req, res, next) {
  try {
    let post = await db.Post.findById(req.params.id);
    if (post) {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return next({
          status: 400,
          message: "You have not yet liked this Post"
        });
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
      await post.save();
      return res.json(post);
    } else {
      return next({
        status: 400,
        message: "Post does not exists"
      });
    }
  } catch (error) {
    next(error);
  }
};

/**********************
 *COMMENTS
 **********************/
exports.addCommentToPost = async function(req, res, next) {
  try {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //If any errors send 400 with errors object
      return next({
        status: 400,
        message: errors
      });
    }
    let post = await db.Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };
    //Add to comment Array
    post.comments.unshift(newComment);
    //Save
    await post.save();
    return res.json(post);
  } catch (error) {
    next({
      status: 400,
      message: "No Post Found"
    });
  }
};
exports.deleteCommentFromPost = async function(req, res, next) {
  try {
    let post = await db.Post.findById(req.params.id);
    //check to see if comment exists
    if (
      post.comments.filter(
        comment => comment._id.toString() === req.params.comment_id
      ).length === 0
    ) {
      return next({
        status: 404,
        message: "Comment does not exist "
      });
    }
    //Get remove index
    const removeIndex = post.comments
      .map(item => item.id.toString())
      .indexOf(req.params.comment_id);
    //Splice cooment out of array
    post.comments.splice(removeIndex, 1);
    //save
    await post.save();
    return res.json(post);
  } catch (error) {
    next(error);
  }
};
