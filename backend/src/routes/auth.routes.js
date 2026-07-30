import { Router } from 'express';
import { login, register, recoverPassword } from '../controllers/auth.controller.js';
import { limiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/login', limiter, login);
router.post('/register', limiter, register);
router.post('/recover-password', limiter, recoverPassword);

export default router;
