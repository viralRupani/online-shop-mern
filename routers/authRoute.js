const router = require("express").Router();
const {
  getRegister,
  getLogin,
  postRegister,
  postLogin,
  logout,
} = require("../controllers/authController");

router.route("/register").get(getRegister).post(postRegister);
router.route("/login").get(getLogin).post(postLogin);
router.get("/logout", logout);

module.exports = router;
