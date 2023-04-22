const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/onlineShopDb");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const User = require("./models/user");
passport.use(User.createStrategy());

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const authRouter = require("./routers/authRoute");

app.use("/auth", authRouter);

app.route("/").get((req, res) => {
  console.log(req.isAuthenticated());
  res.render("pages/home", { isAuthenticated: req.isAuthenticated() }); //-------------------- change this line
});

app.listen(3000, () => {
  console.log("server is started.");
});
