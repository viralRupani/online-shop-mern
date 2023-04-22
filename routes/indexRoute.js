const router = require("express").Router();

const { home, cart } = require("../controllers/indexController");

router.route("/").all(home);
router.route("/cart").all(cart);

module.exports = router;
