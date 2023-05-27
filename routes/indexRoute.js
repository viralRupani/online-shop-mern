const router = require("express").Router();

const { home, checkout } = require("../controllers/indexController");

router.route("/").all(home);
router.route("/checkout").all(checkout);

module.exports = router;
