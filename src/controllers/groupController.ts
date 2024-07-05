import { Request, Response } from 'express';
import GroupModel from '../models/groupModel';
import { GroupStatus } from '../common/Enums';

export const createGroup = async (req: Request, res: Response) => {
  try {
    const user = req?.user;
    const { name, description, members } = req.body;
    // Null check for name, email, and password
    if (!name || !members) {
      return res.status(400).json({ status: 400, message: 'Please check the registration credentials supplied.' });
    }

    if (!Array.isArray(members)) {
      return res.status(400).json({ status: 400, message: 'Please check the members supplied.' });
    }

    // Find if we have a user with the same email already saved
    const groupExists = await GroupModel.findOne({ name, createdByUser: user?.userId });
    if (groupExists) {
      return res.status(409).json({ status: 409, message: 'Group already exists.' });
    }

    const newGroup = new GroupModel({
      name,
      description,
      createdByUser: user?.userId,
      status: GroupStatus.ACTIVE,
      members: [...members, user?.userId],
    });
    await newGroup.save();
    return res.status(201).json({ status: 201, message: 'Group created successfully.' });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};