const Blog = require("../models/blogModel");

module.exports = {
  getUsersPosts: async (req, res) => {
    try {
      const allUserPosts = await Blog.find({ authorId: req.user.id });
      res.json(allUserPosts);
    } catch (err) {
      res.send({ msg: err });
    }
  },

  createBlogPost: async (req, res) => {
    const { subject, text } = req.body;

    try {
      const newPost = await new Blog({
        subject,
        text,
        authorId: req.user.id,
      }).save();

      res.json(newPost);
    } catch (err) {
      res.json({ msg: err });
    }
  },
};
