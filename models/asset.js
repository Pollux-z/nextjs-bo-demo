import mongoose, { Schema } from "mongoose";

const assetSchema = new Schema(
  {
    project: {
      type: String,
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
    userCreate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);
export default Asset;
