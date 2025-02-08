import mongoose, { Schema } from "mongoose";

const carrecordSchema = new Schema(
  {
    code: {
      type: Number,
    },
    destination: {
      type: String,
      required: true,
    },
    startDistance: {
      type: Number,
      default: 0
    },
    endDistance: {
      type: Number,
      default: 0
    },
    floor: {
      type: String,
      default: "4"
    },
    slot: {
      type: String,
      default: ""
    },
    remark: {
      type: String,
      default: ""
    },
    userCreate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Carrecord =
  mongoose.models.Carrecord || mongoose.model("Carrecord", carrecordSchema);
export default Carrecord;
