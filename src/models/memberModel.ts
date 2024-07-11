import { Schema, model } from 'mongoose';

export interface IMember {
  name: string;
  email?: string;
  mobileNumber?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const memberSchema: Schema<IMember> = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: false,
      type: String,
    },
    mobileNumber: {
      required: false,
      type: String,
    },
    userId: {
      required: false,
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

const MemberModel = model<IMember>('Member', memberSchema);

export default MemberModel;
