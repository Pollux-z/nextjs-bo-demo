import mongoose, { Schema, Document } from "mongoose";

interface ITopUp {
  id?: number;
  employee: mongoose.Schema.Types.ObjectId;
  topUpDay: number;
  type: string;
  vacationBalance: string;
  status?: string;
  remark?: string;
  userCreate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const topUpSchema = new Schema<ITopUp, Document>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      default: 1,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
      required: true,
    },
    topUpDay: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    vacationBalance: {
      type: String,
    },
    status: {
      type: String,
      default: "Panding",
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

const TopUp = mongoose.models.TopUp || mongoose.model("TopUp", topUpSchema);

export default TopUp;
