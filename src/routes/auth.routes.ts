import { Router } from 'express';
import { signin, signup, logout } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);

export default router;