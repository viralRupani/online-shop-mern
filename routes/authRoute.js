const router = require("express").Router();

const { register, login, logout } = require("../controllers/authController");

router.route("/register").all(register);
router.route("/login").all(login);
router.route("/logout").get(logout);

module.exports = router;
