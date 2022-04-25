const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getUser: async (req, res) => {
    res.json(req.user);
  },

  registerUser: async (req, res) => {
    if (!req.body.userName) return res.json({ msg: "no userName key present" });
    if (!req.body.email) return res.json({ msg: "no email key present" });
    if (!req.body.password) return res.json({ msg: "no password key present" });

    try {
      const userExists = await User.findOne({ email: req.body.email });

      if (userExists)
        return res.json({ msg: "User with this email already exists" });

      const salt = await bcrypt.genSalt();
      const hashedPW = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPW,
      }).save();

      res.json(newUser);
    } catch (err) {
      res.json({ msg: err });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return res.status(500).json({ msg: "No user with that email" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.json({ msg: "The password is incorrect" });

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({
        token,
        user: { userName: user.userName, email: user.email, id: user._id },
      });
    } catch (err) {
      return res.json({ msg: err });
    }
  },
};
