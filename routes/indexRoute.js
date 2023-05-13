const router = require("express").Router();

const { home } = require("../controllers/indexController");

router.route("/").all(home);

module.exports = router;
