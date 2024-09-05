import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A purchase must have a seller"],
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A purchase must have a buyer"],
  },
  beat: {
    type: Schema.Types.ObjectId,
    ref: "Beat",
    required: [true, "A purchase must have a beat"],
  },
  date: {
    type: Date,
    required: [true, "A purchase must have a date"],
    default: () => Date.now(),
  },
  license: {
    type: String,
    required: [true, "A purchase must have a license"],
  },
});

const Purchase = model("Purchase", purchaseSchema);

export default Purchase;
