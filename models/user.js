import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userCode: {
      type: Number,
      default: 0,
    },
    nameTh: {
      type: String,
      required: true,
    },
    nameEng: {
      type: String,
      required: true,
    },
    nickNameTh: {
      type: String,
    },
    employeeProfile: {
      type: String,
    },
    employeeTitle: {
      type: String,
    },
    employeeTeams: {
      type: String,
    },
    employeeTel: {
      type: String,
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    employeeBirthDay: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    teamLeader: {
      type: String,
    },
    vacationLeave: {
      type: Number,
      default: 12,
    },
    sickLeave: {
      type: Number,
      default: 30,
    },
    personalLeave: {
      type: Number,
      default: 7,
    },
    year2024Leave: {
      vacationLeave: {
        type: Number,
        default: 0
      },
      personalLeave: {
        type: Number,
        default: 0
      },
      sickLeave: {
        type: Number,
        default: 0
      },
    },
    year2025Leave: {
      vacationLeave: {
        type: Number,
        default: 12
      },
      personalLeave: {
        type: Number,
        default: 7
      },
      sickLeave: {
        type: Number,
        default: 30
      },
    },
    remark: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
    },
    userUpdated: {
      type: String,
    },
    userCreate: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
