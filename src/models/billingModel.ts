import { Schema, model } from "mongoose";

const billingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A billing must belong to a user"],
  },
  membership: {
    type: String,
    required: [true, "A billing must have a membership"],
  },
  date: {
    type: Date,
    required: [true, "A billing must have a membership"],
    default: () => Date.now(),
  },
  amount: {
    type: String,
    required: [true, "A billing must have an amount"],
  },
});

const Billing = model("Billing", billingSchema);

export default Billing;
