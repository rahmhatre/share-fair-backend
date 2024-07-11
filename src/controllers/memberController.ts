import { Request, Response } from 'express';
import MemberModel from '../models/memberModel';

export const createMember = async (req: Request, res: Response) => {
  try {
    const user = req?.user;
    const { name, email, mobileNumber } = req.body;

    // Null check for name
    if (!name) {
      return res.status(400).json({ status: 400, message: 'Please check the member name supplied.' });
    }

    if (!email || !mobileNumber) {
      return res.status(400).json({ status: 400, message: 'Either email or mobile number must be supplied.' });
    }

    // Find if we have a user with the same email already saved
    const memberExists = await MemberModel.findOne({ name, email, mobileNumber });
    if (memberExists) {
      return res.status(409).json({ status: 409, message: 'Member already exists.' });
    }

    await addMember(name, email, mobileNumber);
    return res.status(201).json({ status: 201, message: 'Member created successfully.' });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};

export const addMember = async (name: string, email?: string, mobileNumber?: string) => {
  const newMember = new MemberModel({
    name,
    email,
    mobileNumber,
  });
  await newMember.save();
};
