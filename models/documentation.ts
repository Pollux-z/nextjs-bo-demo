import mongoose, { Schema, Document } from "mongoose";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

interface IDocumentation {
  id: number;
  title: string;
  description: string;
  url: string;
  userCreate: string;
  remark: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  localCreatedAt: string;
  localUpdatedAt: string;
  fileTypes: string;
}

interface IDocumentationMethods {
  getLocalTime(date: Date): string;
}

type IDocumentationDocument = Document<unknown, {}, IDocumentation> &
  IDocumentation &
  IDocumentationMethods;

const documentationSchema = new Schema<IDocumentation, Document>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      default: 1
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
    url: {
      type: String,
    },
    localCreatedAt: {
      type: String,
    },
    localUpdatedAt: {
      type: String,
    },
    remark: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    fileTypes: { 
      type: String,
      default: "PDF",
    },
    userCreate: {
      type: String,
      default: "system",
    },
  },
  { timestamps: true }
);

documentationSchema.methods.getLocalTime = function (date: Date) {
  return format(
    new TZDate(date, "Asia/Bangkok"),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  );
};

documentationSchema.pre<IDocumentationDocument>("save", function (next) {
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

const Documentation =
  mongoose.models.Documentation ||
  mongoose.model("Documentation", documentationSchema);

export default Documentation;




