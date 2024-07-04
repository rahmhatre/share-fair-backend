import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { AuthMode, UserStatus, UserType } from '../common/Enums';
import { generateJWTToken } from '../middleware/auth';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Null check for name, email, and password
    if (!email || !name || !password) {
      return res.status(401).json({ status: 401, message: 'Please check the registration credentials supplied.' });
    }

    // Find if we have a user with the same email already saved
    const userExists = await UserModel.findOne({ email: req?.body?.email });
    if (userExists) {
      return res.status(409).json({ status: 409, message: 'User already exists.' });
    }

    const newUser = new UserModel({ name, email, password, authMode: AuthMode.CLASSIC, userType: UserType.USER, status: UserStatus.ACTIVE });
    const savedUser = await newUser.save();

    // Create NEW jwt token and save in db
    const newlyCreatedObj = await generateJWTTokenAndSaveUpdateDB(savedUser?._id as any, savedUser?.email);
    return res
      .status(201)
      .setHeader('Authorization', newlyCreatedObj?.accessToken!)
      .json({ status: 201, message: 'User created successfully.', user: savedUser });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error?.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Null check for email and password
    if (!email || !password) {
      return res.status(401).json({ status: 401, message: 'Please check the login credentials supplied.' });
    }

    // Find if we have a user with the same email already saved
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ status: 401, message: 'User does not exist. Please sign up to register.' });
    }

    userExists.comparePassword(password, async (matchError: Error | null, isMatch: boolean) => {
      if (matchError) {
        return res.status(401).json({ status: 401 });
      } else if (!isMatch) {
        return res.status(401).json({ status: 401 });
      } else {
        // Create NEW jwt token and save in db
        const newlyCreatedObj = await generateJWTTokenAndSaveUpdateDB(userExists?._id as string, userExists?.email);
        return res.status(200).setHeader('Authorization', newlyCreatedObj?.accessToken!).json({ status: 200 });
      }
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error?.message });
  }
};

export const loginByGoogle = async (req: Request, res: Response) => {
  try {
    // Null check for email and name
    const { name, email } = req.body;

    if (!email || !name) {
      return res.status(401).json({ status: 401, message: 'Please check the login credentials supplied.' });
    }

    // Find if we have a user with the same email already saved
    const userExists = await UserModel.findOne({ email: email });

    // If user does not exist then create a new user with email and user name and let them login
    if (!userExists) {
      // POST user
      const data = new UserModel({
        name: req?.body?.name,
        email: req?.body?.email,
        authMode: AuthMode.GOOGLE,
        userType: UserType.USER,
        status: UserStatus.ACTIVE,
      });

      try {
        const dataToSave = await data.save();
        // Create NEW jwt token and save in db
        const newlyCreatedObj = await generateJWTTokenAndSaveUpdateDB(dataToSave?._id as string, dataToSave?.email);
        return res
          .status(200)
          .setHeader('Authorization', newlyCreatedObj?.accessToken!)
          .json({ status: 200, message: 'User created and logged in successfully.' });
      } catch (error) {
        return res.status(400).json({ status: 400, message: (error as Error).message });
      }
    }
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error?.message });
  }
};

const generateJWTTokenAndSaveUpdateDB = async (userId: string, email: string) => {
  // Create NEW jwt token and save in db
  const token = generateJWTToken(userId, email);
  // Save the token back to the newly created user
  return await UserModel.findOneAndUpdate({ _id: userId }, { accessToken: token }, { new: true });
};
