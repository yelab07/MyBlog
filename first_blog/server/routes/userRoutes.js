const {
  getUser,
  registerUser,
  login,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.get("/", auth, getUser);
router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
