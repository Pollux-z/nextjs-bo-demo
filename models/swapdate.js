import mongoose, { Schema } from "mongoose";

const swapDateSchema = new Schema(
  {
    id: {
      type: Number,
      default: 0,
    },
    employee: {
      type: String,
      required: true,
    },
    projectAction: {
      type: String,
    },
    actionDate: {
      type: Array,
    },
    swapDate: {
      type: Array,
    },
    status: {
      type: String,
      default: "Panding",
    },
    attachFile: {
      type: String,
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

const SwapDate = mongoose.models.SwapDate || mongoose.model("SwapDate", swapDateSchema);
export default SwapDate;
