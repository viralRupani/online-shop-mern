const router = require("express").Router();

const {
  cart,
  removeCartItem,
  createCheckoutSession,
} = require("../controllers/cartController");

router.route("/").all(cart);
router.route("/removeCartItem").all(removeCartItem);
router.route("/create-checkout-session").post(createCheckoutSession);

module.exports = router;
