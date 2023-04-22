const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user");

module.exports.register = (req, res) => {
  if (req.method === "POST") {
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
  } else {
    res.render("pages/register");
  }
};

module.exports.login = (req, res) => {
  if (req.method === "POST") {
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
  } else {
    res.render("pages/login");
  }
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
};
