import { Request, Response } from 'express';
import UserModel from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    // if (deletedUser) {
    //   res.status(200).json({ message: 'User deleted' });
    // } else {
    //   res.status(404).json({ message: 'User not found' });
    // }
    return res.status(501).send('Delete by ID API');
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};
