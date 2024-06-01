const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A purchase must have a seller"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A purchase must have a buyer"],
  },
  beat: {
    type: mongoose.Schema.Types.ObjectId,
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
