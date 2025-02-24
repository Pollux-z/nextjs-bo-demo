import { UsersType } from "./User";

export type ReserveType = {
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
