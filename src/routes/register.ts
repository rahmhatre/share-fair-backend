import { Router } from 'express';
import { loginByGoogle, loginUser, registerUser } from '../controllers/registerController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/googleLogin,', loginByGoogle);

export default router;
