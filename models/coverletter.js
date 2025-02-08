import mongoose, { Schema } from "mongoose";

const coverletterSchema = new Schema(
  {
    id: {
      type: Number,
    },
    subject: {
      type: String,
      required: true,
    },
    project: {
      type: String,
    },
    issueDate: {
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

const CoverLetter =
  mongoose.models.CoverLetter ||
  mongoose.model("CoverLetter", coverletterSchema);
export default CoverLetter;
