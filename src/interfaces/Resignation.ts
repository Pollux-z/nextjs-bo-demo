import { UsersType } from "./User";

export interface ResignationType {
    id: string;
    v: number;
    createdAt: Date;
    id_: number;
    effectiveDate: Date;
    note: string;
    status: string;
    updatedAt: Date;
    userRequest: string;
    userCreate: string;
    userRequestResign: UsersType;
}