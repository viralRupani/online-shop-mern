const router = require("express").Router();

const {
  home,
  cart,
  removeCartItem,
} = require("../controllers/indexController");

router.route("/").all(home);
router.route("/cart").all(cart);
router.route("/removeCartItem").all(removeCartItem);

module.exports = router;
