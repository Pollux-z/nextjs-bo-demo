import { UsersType } from "./User";

export type CarrecordType = {
  _id: string;
  code: number;
  destination: string;
  startDistance: number;
  endDistance: number;
  floor: string;
  slot: string;
  remark: string;
  userCreate: string;
  employee_info: UsersType;
};
