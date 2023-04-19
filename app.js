const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.route("/").get((req, res) => {
    res.render("pages/home");
});

app.listen(3000, () => {
  console.log("server is started.");
});
