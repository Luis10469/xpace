import { Router } from 'express';

import {
  login,
  register,
  recoverPassword,
  resetPassword
} from '../controllers/auth.controller.js';

import { limiter } from '../middleware/rateLimit.js';

const router = Router();

// ==========================
// AUTENTICACIÓN
// ==========================

router.post('/login', limiter, login);

router.post('/register', limiter, register);

// ==========================
// RECUPERACIÓN DE CONTRASEÑA
// ==========================

router.post('/recover-password', limiter, recoverPassword);

router.post('/reset-password', limiter, resetPassword);

export default router;