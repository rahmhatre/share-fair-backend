import { Request, Response } from 'express';
import GroupModel, { IGroup } from '../models/groupModel';
import { GroupStatus } from '../common/Enums';
import { addMember } from './memberController';

export const createGroup = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req?.user;
    const { name, description, members } = req.body as IGroup;
    // Null check for name
    if (!name) {
      return res.status(400).json({ status: 400, message: 'Please check the group name supplied.' });
    }

    if (!Array.isArray(members)) {
      return res.status(400).json({ status: 400, message: 'Please check the members supplied.' });
    }

    // Find if we have a user with the same email already saved
    const groupExists = await GroupModel.findOne({ name, createdByUser: loggedInUser?.userId });
    if (groupExists) {
      return res.status(409).json({ status: 409, message: 'Group already exists.' });
    }

    // TODO:  Create Members in Member Table and then add the MemberIds to members in the group table
    // Update the members to accept array of objects which will have member data and add them member table
    // members.forEach(element => {
    //   // await addMember()
    // });

    const newGroup = new GroupModel({
      name,
      description,
      createdByUser: loggedInUser?.userId,
      status: GroupStatus.ACTIVE,
      // members: [...members, user?.userId], // TODO: work pending
    });
    await newGroup.save();
    return res.status(201).json({ status: 201, message: 'Group created successfully.' });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};
