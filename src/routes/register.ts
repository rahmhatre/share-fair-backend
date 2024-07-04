// // Login by email and username which is authenticated with Google
// register.post('/googlelogin', async (req: IUserRequest, res: Response) => {
//   try {
//     // Null check for email and name
//     if (!req?.body?.email || !req?.body?.name) {
//       return res.status(401).json({ status: 401, message: 'Please check the login credentials supplied.' });
//     }

//     // Find if we have a user with the same email already saved
//     const userExists = await UserModel.findOne({ email: req?.body?.email });

//     // If user does not exist then create a new user with email and user name and let them login
//     if (!userExists) {
//       // POST user
//       const data = new UserModel({
//         name: req?.body?.name,
//         email: req?.body?.email,
//         authMode: AuthMode.GOOGLE,
//         userType: UserType.USER,
//         isShopVerified: false,
//         status: UserStatus.ACTIVE,
//       });

//       try {
//         const dataToSave = await data.save();
//         // Create NEW jwt token and save in db
//         const newlyCreatedObj = await generateJWTTokenAndSaveUpdateDB(dataToSave?._id, dataToSave?.email);
//         return res.status(200).setHeader('Authorization', newlyCreatedObj?.accessToken).json({ status: 200, message: 'User created and logged in successfully.' });
//       } catch (error) {
//         return res.status(400).json({ status: 400, message: (error as Error).message });
//       }
//     }

//     // Create NEW jwt token and save in db
//     const newlyCreatedObj = await generateJWTTokenAndSaveUpdateDB(userExists?._id, userExists?.email);
//     return res.status(200).setHeader('Authorization', newlyCreatedObj?.accessToken).json({ status: 200, message: 'User logged in successfully.' });
//   } catch (error) {
//     res.status(400).json({ status: 400, message: (error as Error).message });
//   }
// });

import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/registerController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
