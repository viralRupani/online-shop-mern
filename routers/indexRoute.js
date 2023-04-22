const router = require("express").Router();

const { getHomePage, getCart } = require("../controllers/indexController");

router.route("/").get(getHomePage);
router.route("/cart").get(getCart);

module.exports = router;
