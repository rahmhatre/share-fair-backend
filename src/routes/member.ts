import { Router } from 'express';
import { createMember } from '../controllers/memberController';

const router = Router();

router.post('/member', createMember);

export default router;
