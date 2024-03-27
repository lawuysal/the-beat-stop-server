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
  role: {
    type: String,
    required: [true, "A user must have a role"],
    default: "user",
    enum: ["admin", "user"],
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
    enum: ["male", "female", "none"],
  },
  membership: {
    type: String,
    required: [true, "A user must have a membership"],
    enum: ["free", "standart", "premium"],
    default: "free",
  },
  lastMonthSale: {
    type: Boolean,
    required: [true, "A user must have a last month sale field"],
  },
  createdAt: {
    type: Date,
    required: [true, "A user must have a created date"],
    immutable: true,
    default: () => new Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => new Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
