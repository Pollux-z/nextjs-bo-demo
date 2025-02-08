import { UsersType } from "./User";

export type MeetingRoomType = {
  _id: string;
  id: number;
  category: string;
  subject: string;
  startDate: string;
  startTime: string;
  endTime: string;
  status: string;
  remark: string;
  userCreate: string;
  employee_info: UsersType;
};
