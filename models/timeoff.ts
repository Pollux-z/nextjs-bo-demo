import mongoose, { Schema } from "mongoose";

const timeoffSchema = new Schema(
  {
    id: {
      type: Number,
      default: 0
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    issueDate: {
      type: Array,
      required: true,
    },
    halfDay: {
      type: String,
      default: "FullDay"
    },
    status: {
      type: String,
      default: "Pending"
    },
    userCreate: {
      type: String,
    },
  },
  { timestamps: true }
);

const TimeOff =
  mongoose.models.TimeOff || mongoose.model("TimeOff", timeoffSchema);
export default TimeOff;
