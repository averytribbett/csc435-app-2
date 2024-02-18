const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  cart: [],
});

module.exports = mongoose.model("User", userSchema);