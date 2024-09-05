import mongoose, { Document, Model, Schema, model } from "mongoose";

interface TrackDocument extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  uploadedAt: Date;
  fileType: string;
  path: string;
  uploader: mongoose.Schema.Types.ObjectId;
}

const trackSchema = new Schema<TrackDocument>({
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

const Track: Model<TrackDocument> = model<TrackDocument>("Track", trackSchema);

export default Track;
