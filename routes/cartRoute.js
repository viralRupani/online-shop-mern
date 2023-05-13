const router = require("express").Router();

const { cart, removeCartItem } = require("../controllers/cartController");

router.route("/").all(cart);
router.route("/removeCartItem").all(removeCartItem);

module.exports = router;
