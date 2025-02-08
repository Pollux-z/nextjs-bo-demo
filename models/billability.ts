import mongoose, { Schema, model, Document } from "mongoose";
import { string } from "prop-types";

interface Billability extends Document {
  projectID: string;
  billabilityProject: [
    {
      actionUser: string;
      manDay: number;
    }
  ];
  status: string;
  userCreated: string;
  timestamp?: string;
}

const BillabilitySchema = new Schema<Billability>(
  {
    id: {
        type: String,
    },
    projectID: {
      type: String,
      required: true,
    },
    billabilityProject: [
      {
        actionUser: {
          type: String,
        },
        manDay: {
          type: Number,
        },
      },
    ],
    status: {
        type: String,
        default: "isActive"
    },
    userCreated: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
    },
  },
  { timestamps: true }
);

const Billability =
  mongoose.models.Billability ||
  mongoose.model<Billability>("Billability", BillabilitySchema);

export default Billability;
