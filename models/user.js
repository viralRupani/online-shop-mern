const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { productSchema } = require("./product");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cart: [productSchema],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
