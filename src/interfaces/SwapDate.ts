import { UsersType } from "./User";

export type SwapDateType = {
    _id: string;
    id: number;
    employee: string;
    projectAction: string;
    actionDate: string[];
    swapDate: string[];
    status: string;
    attachFile: string;
    remark: string;
    userCreate: string;
    employee_info: UsersType
  };

 
  