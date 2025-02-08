import { TimeOff } from "./TimeOff";
import { TopUpType } from "./TopUp";

interface UserYear2024Leave {
  vacationLeave: number ;
  personalLeave: number ;
  sickLeave: number ;
}
interface UserYear2023Leave {
  vacationLeave: number;
  personalLeave: number;
  sickLeave: number;
}

export interface BillabilityProject {
  userId: string;
  projectId: string;
  manDay: number;
}

export interface UserBillability {
  projectCode: string;
  projectEng: string;
  billabilityProject: BillabilityProject[];
}

export type UsersType = {
  _id: string;
  id: string;
  totalManday: number;
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
  year2023Leave: UserYear2023Leave;
  year2024Leave: UserYear2024Leave;
  year2025Leave: UserYear2024Leave | any;
  remark: string;
  password?: string;
  role: string;
  userUpdated: string;
  userCreate: string;
  teamLeader_info: UsersType
  userBillability: UserBillability[]
  timeOffRecords: TimeOff[];
  topupRecords: TopUpType[];
  costPerManDay: number;
};
