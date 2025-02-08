import { UsersType } from "./User";

interface UserYear2024Leave {
  vacationLeave: number;
  personalLeave: number;
  sickLeave: number;
}

export type TimeOff = {
  _id: number;
  id: number;
  employee: string;
  type: string;
  reason?: string;
  issueDate: string[]; // Define as an array of strings or modify as needed
  halfDay: string;
  status: string;
  userCreate?: string;
  createdAt: string;
  employee_info: {
    _id: string;
    userCode: number;
    nameTh: string;
    nameEng: string;
    nickNameTh: string;
    employeeProfile: string;
    employeeTitle: string;
    employeeTeams: string;
    employeeTel: string;
    employeeEmail: string;
    employeeBirthDay: string;
    startDate: string;
    endDate: string;
    teamLeader: string;
    vacationLeave: number;
    sickLeave: number;
    personalLeave: number;
    year2024Leave: UserYear2024Leave;
    remark: string;
    password?: string;
    role: string;
    userUpdated: string;
    userCreate: string;
  };
};

export type CalculateLeave = {
  sortType: string;
  dataTimeOffs: any;
  users: any;
};

export type GetTotalLeave = {
  sortType: string;
  users: UsersType;
};

export type TotalTimeOff = {
  sortType: string;
  data: any;
  users: any;
};
