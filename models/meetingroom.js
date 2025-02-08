import mongoose, { Schema } from "mongoose";

const meetingroomSchema = new Schema(
  {
    project: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    userCreate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MeetingRoom =
  mongoose.models.MeetingRoom ||
  mongoose.model("MeetingRoom", meetingroomSchema);
export default MeetingRoom;
