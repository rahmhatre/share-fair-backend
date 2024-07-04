import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
