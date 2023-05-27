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

module.exports.checkout = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("pages/checkout.ejs");
  } else {
    res.redirect("/auth/login");
  }
};
