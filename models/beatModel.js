const mongoose = require("mongoose");

const beatSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A beat must have a name"],
    default: "Untitled Beat",
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: [true, "A beat must have atleast a track"],
    },
  ],
  summary: {
    type: String,
    required: [true, "A beat must have a summary"],
    default: "A new beat",
  },
  description: {
    type: String,
    default: "none",
  },
  type: {
    type: String,
    required: [true, "A beat must have a type"],
    default: "none",
  },
  paid: {
    type: Boolean,
    required: [true, "A beat must have paid status"],
    default: false,
  },
  license: {
    type: String,
    required: [true, "A beat must have a license"],
    default: free,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A beat must have an owner"],
  },
  bpm: {
    type: String,
    required: [true, "A beat must have a bpm"],
    default: "100",
  },
  key: {
    type: String,
    required: [true, "A beat must have a key"],
    default: "C Major",
  },
  photo: {
    type: String,
    default: "images/beat-images/default/default-large",
  },
});

const Beat = mongoose.Model("Beat", beatSchema);

module.exports = Beat;
