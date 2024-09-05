import { Schema, model } from "mongoose";

const trackSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A track must have an uploader"],
  },
});

const Track = model("Track", trackSchema);

export default Track;
