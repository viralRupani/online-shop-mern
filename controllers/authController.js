const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user");

// Register
module.exports.getRegister = (req, res) => {
  res.render("pages/register");
};

module.exports.postRegister = (req, res) => {
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    (err, account) => {
      if (err) {
        console.log(err);
        res.redirect("/auth/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    }
  );
};

// Login
module.exports.getLogin = (req, res) => {
  res.render("pages/login");
};

module.exports.postLogin = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/auth/login");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
