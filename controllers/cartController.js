const { Product } = require("../models/product");
const User = require("../models/user");

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
      console.log(subTotal);
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
      { $pull: { cart: { _id: req.body.submitButton } } }
    ).catch((err) => {
      console.log(err);
    });
    res.redirect("/cart");
  } else {
    res.redirect("/");
  }
};
