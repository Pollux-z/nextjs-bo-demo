import mongoose, { Schema, model, Document } from "mongoose";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

interface IWorkprocess extends Document {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  remark: string;
  localCreatedAt: string;
  localUpdatedAt: string;
  isActive: boolean;
  fileTypes: string;
  userCreate: string;
  createdAt: Date;
  updatedAt: Date;
  teamOwner: string;
  imgUrl: string;
}

interface IWorkprocessMethods {
    getLocalTime(date: Date): string;
  }

  type IDocumentationDocument = Document<unknown, {}, IWorkprocess> &
  IWorkprocess &
  IWorkprocessMethods;


const WorkprocessSchema = new Schema<IWorkprocess, Document>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      default: 1,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      minlength: [2, "Description must be at least 2 characters long"],
      maxlength: [100, "Description must be at most 100 characters long"],
    },
    fileUrl: {
      type: String,
    },
    remark: {
      type: String,
    },
    fileTypes: {
      type: String,
      default: "PDF",
    },
    teamOwner: {
      type: String,
      default: "TIME",
    },
    imgUrl: {
      type: String,
    },
    localCreatedAt: {
      type: String,
    },
    localUpdatedAt: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userCreate: {
      type: String,
      default: "System",
    },
  },
  { timestamps: true }
);

WorkprocessSchema.methods.getLocalTime = function (date: Date) {
  return format(
    new TZDate(date, "Asia/Bangkok"),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  );
};

WorkprocessSchema.pre<IDocumentationDocument>("save", function (next) {
  this.localCreatedAt = format(
    new TZDate(new Date(), "Asia/Bangkok"),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  );
  this.localUpdatedAt = format(
    new TZDate(new Date(), "Asia/Bangkok"),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  );
  next();
});

const Workprocess =
  mongoose.models.Workprocess || 
  mongoose.model("Workprocess", WorkprocessSchema);

export default Workprocess;
