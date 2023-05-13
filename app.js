const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
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
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const indexRouter = require("./routes/indexRoute");
const authRouter = require("./routes/authRoute");
const cartRouter = require("./routes/cartRoute");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

app.listen(3000);
