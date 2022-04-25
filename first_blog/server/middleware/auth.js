const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token || token === undefined) res.json({ msg: "Authorization failed" });

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  User.findById(verified.id)
    .then((userResponse) => {
      req.user = {
        userName: userResponse.userName,
        email: userResponse.email,
        id: verified.id,
      };
      next();
    })
    .catch((err) => res.json({ msg: err }));
};
