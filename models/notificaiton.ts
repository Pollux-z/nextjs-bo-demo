import moment from "moment-timezone";
import mongoose, { Schema, Document } from "mongoose";

// Example timestamp
const timestamp = new Date();

// Convert to Bangkok time zone
const bangkokTime = moment
  .tz(timestamp, "Asia/Bangkok")
  .format("YYYY-MM-DD HH:mm:ss");


interface INotification extends Document {
  title: string;
  userRequest: mongoose.Schema.Types.ObjectId;
  userReceive: mongoose.Schema.Types.ObjectId;
  typeRequest: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      index: true,
      unique: true,
      default: 0
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    userRequest: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    userReceive: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    typeRequest: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    statusRead: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

NotificationSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastNotification = await mongoose.models.Notification.findOne().sort({ id: -1 });
    this.id = lastNotification ? lastNotification.id + 1 : 1;
  }
  next();
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
