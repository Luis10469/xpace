import { Router } from 'express';
import { getDashboard } from '../controllers/dashboard.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { checkRole } from '../middleware/roles.js';

const router = Router();

// Solo los administradores pueden ver el dashboard
router.get('/', verifyToken, checkRole('admin'), getDashboard);

export default router;