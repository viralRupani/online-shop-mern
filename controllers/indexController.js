const { Product } = require("../models/product");
const User = require("../models/user");

module.exports.home = async (req, res, next) => {
  if (req.isAuthenticated()) {
    var user = await User.findOne({ username: req.user.username });
  }
  const products = await Product.find();

  res.render("pages/home", {
    user: user,
    isAuthenticated: req.isAuthenticated(),
    foundProducts: products,
  });
};

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
      res.render("pages/cart", { user: user, isAuthenticated: true });
    }
  } else {
    res.redirect("/");
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
