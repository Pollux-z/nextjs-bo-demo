import mongoose, { Document } from 'mongoose';

export interface INotification extends Document {
  title: string;
  userRequest: mongoose.Schema.Types.ObjectId;
  userReceive: mongoose.Schema.Types.ObjectId;
  typeRequest: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userRecords: string;
  teamsLeader: string;
}