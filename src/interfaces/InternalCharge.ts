import mongoose from "mongoose";
import { ProjectType } from "./Project";
import { UsersType } from "./User";

export interface InternalChargeType {
    _id: string;
    id: string;
    buyerUserId: string;
    createdAt?: Date;
    projectRequest: string;
    sellerTeam: string;
    sellerUserId: string;
    status: string;
    title: string;
    updatedAt?: Date;
    buyerUser?: UsersType;
    sellerUser?: UsersType;
    projectInternalCharge?: ProjectType;
}
