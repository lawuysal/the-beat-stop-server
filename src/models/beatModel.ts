import mongoose from "mongoose";

const beatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A beat must have a name"],
    default: "Untitled Beat",
  },
  fullTrack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Track",
    required: [true, "A beat must have a full track"],
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: [true, "A beat must have atleast a track"],
      default: [],
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
  type: [
    {
      type: String,
      required: [true, "A beat must have a type"],
      default: "none",
    },
  ],
  paid: {
    type: Boolean,
    required: [true, "A beat must have paid status"],
    default: false,
  },
  license: {
    type: String,
    required: [true, "A beat must have a license"],
    enum: ["free", "basic", "standard", "pro"],
    default: "free",
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
    default: "dev-data\\images\\beat-images\\default\\default-large.jpg",
  },
  createdDate: {
    type: Date,
    required: [true, "A beat must have a date"],
    default: () => Date.now(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
});

const Beat = mongoose.model("Beat", beatSchema);

export default Beat;
