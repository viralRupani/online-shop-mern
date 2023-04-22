const Product = require("../models/product");

module.exports.getHomePage = async (req, res, next) => {
  Product.find()
    .then((foundProducts) => {
      res.render("pages/home", {
        isAuthenticated: req.isAuthenticated(),
        foundProducts: foundProducts,
      });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
