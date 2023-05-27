const { Product } = require("../models/product");
const User = require("../models/user");
const stripe = require("stripe")("sk_test_51Ls1X7SHdLazudTuypO7XZJE8sdeph0erg3NGaNOfiAcsCYUPYPObtjRezRZ0c4uOM5krFwXWKQRxUM60kuJgvyW00zrSsehhW");

const YOUR_DOMAIN = "http://localhost:3000";

module.exports.cart = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ username: req.user.username });
    if (req.method === "POST") {
      Product.findById(req.body.submitButton)
        .then((foundProduct) => {
          user.cart.push(foundProduct);
          user.save();
          res.redirect("/cart");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    } else {
      let subTotal = 0;
      user.cart.forEach((product) => {
        subTotal += product.productPrice;
      });
      res.render("pages/cart", {
        user: user,
        isAuthenticated: req.isAuthenticated(),
        subTotal: subTotal,
      });
    }
  } else {
    res.redirect("/auth/login");
  }
};

module.exports.removeCartItem = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ username: req.user.username });

    User.updateOne(
      { username: user.username },
      { $pull: { cart: { _id: req.body.removeItemButton } } }
    ).catch((err) => {
      console.log(err);
    });
    res.redirect("/cart");
  } else {
    res.redirect("/");
  }
};

module.exports.createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1N7fa7SHdLazudTuCl6TkbEB',
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/views/pages/payment-status/success.html`,
    cancel_url: `${YOUR_DOMAIN}/views/pages/payment-status/cancel.html`,
  });

  res.redirect(303, session.url);
};
