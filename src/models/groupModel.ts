import { GroupStatus } from './../common/Enums';
import { Schema, model } from 'mongoose';

export interface IGroup {
  name: string;
  description: string;
  members: string[]; // userIds
  status: GroupStatus;
  createdByUser: string; // userId
  createdAt?: string;
  updatedAt?: string;
}

const groupSchema: Schema<IGroup> = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    members: [
      {
        required: true,
        type: String,
      },
    ],
    status: {
      required: true,
      type: String,
    },
    createdByUser: {
      required: true,
      type: String,
    },
    createdAt: {
      required: false,
      type: String,
    },
    updatedAt: {
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const GroupModel = model<IGroup>('Group', groupSchema);

export default GroupModel;
