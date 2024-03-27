const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A track must have a name"],
  },
  uploadedAt: {
    type: Date,
    default: () => Date.now(),
  },
  fileType: {
    type: String,
    required: [true, "A track must have a file type"],
  },
  path: {
    type: String,
    required: [true, "A track must have a link"],
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A track must have an uploader"],
  },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
