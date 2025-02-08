import { UsersType } from "./User";

export type TopUpType = {
  id: string;
  employee: string;
  topUpDay: string;
  vacationBalance: string;
  type: string;
  status: string;
  remark: string;
  userCreate: string;
  employee_info: UsersType;
  createdAt: string;
  updatedAt: string;
};
