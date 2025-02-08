import mongoose, { Schema } from "mongoose";

const announcementSchema = new Schema(
  {
    id: {
      type: Number,
      default: 0
    },
    subject: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    userCreate: {
      type: String,
      required: true,
    },
    attachFile: {
      type: String
    },
    remark: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

announcementSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastAnnouncement = await mongoose.models.Announcement.findOne().sort({ id: -1 });
    this.id = lastAnnouncement ? lastAnnouncement.id + 1 : 1;
  }
  next();
});

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);
export default Announcement;
