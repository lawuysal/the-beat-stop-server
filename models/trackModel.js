const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A track must have a name"],
  },
  uploadedAt: {
    type: Date,
    default: () => new Date.now(),
  },
  duration: {
    type: String,
    required: [true, "A track must have a duration"],
  },
  fileType: {
    type: String,
    required: [true, "A track must have a file type"],
  },
  link: {
    type: String,
    required: [true, "A track must have a link"],
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A track must have an uploader"],
  },
});

const Track = mongoose.Model("Track", trackSchema);

module.exports = Track;
