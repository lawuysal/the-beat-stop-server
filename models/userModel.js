const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    lowercase,
  },
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  photo: {
    type: String,
    default: "none",
  },
  description: {
    type: String,
    default: "none",
  },
  age: {
    type: String,
    default: "none",
  },
  gender: {
    type: String,
    default: "none",
  },
  membership: {
    type: String,
    required: [true, "A user must have a membership"],
    default: "free",
  },
  lastMonthSale: {
    type: Boolean,
    required: [true, "A user must have a last month sale field"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
