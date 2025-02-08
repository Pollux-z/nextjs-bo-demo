import mongoose, { Schema } from "mongoose";

const reserveSchema = new Schema(
  {
    id: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    status: {
      type: String,
      default: "Reserve",
    },
    remark: {
      type: String,
    },
    userCreate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reserve =
  mongoose.models.Reserve || mongoose.model("Reserve", reserveSchema);
export default Reserve;
