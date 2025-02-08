import { UsersType } from "./User";

export type CoverletterType = {
  _id: string;
  id: string;
  subject: string;
  issueDate: string;
  project: string;
  userCreate: string;
  employee_info: UsersType;
};