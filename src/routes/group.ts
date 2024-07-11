import { Router } from 'express';
import { createGroup } from '../controllers/groupController';

const router = Router();

router.post('/group', createGroup);

export default router;
