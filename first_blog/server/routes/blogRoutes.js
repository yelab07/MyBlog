const {
  getUsersPosts,
  createBlogPost,
} = require("../controllers/blogController");

const auth = require("../middleware/auth");

const router = require("express").Router();

router.get("/", auth, getUsersPosts);
router.post("/new", auth, createBlogPost);

module.exports = router;
