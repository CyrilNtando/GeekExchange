//get express router
const express = require("express");
const router = express.Router();

//@route    GET api/posts/test
//@desc     test post route
//@acess    Public
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

module.exports = router;
clearImmediate;
