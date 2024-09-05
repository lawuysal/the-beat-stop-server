import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    lowercase: true,
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
    default: "images/user-images/default/default-large",
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
    default: false,
  },
  mailList: {
    type: Boolean,
    required: [true, "A user must have a mail list check"],
    default: false,
  },
  createdAt: {
    type: Date,
    required: [true, "A user must have a created date"],
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

// Document middleware - manipulates the document before saving.
userSchema.pre("save", async function (next) {
  // The function call happens when only the password really changes.
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
