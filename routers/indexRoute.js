const router = require("express").Router();

const { getHomePage } = require("../controllers/indexController");

router.route("/").get(getHomePage);

module.exports = router;
