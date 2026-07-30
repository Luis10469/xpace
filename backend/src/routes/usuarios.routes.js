import { Router } from 'express';
import { getUsuarios, createUsuario, updateUsuario } from '../controllers/usuarios.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { checkRole } from '../middleware/roles.js';

const router = Router();

router.get('/', verifyToken, checkRole('admin'), getUsuarios);
router.post('/', verifyToken, checkRole('admin'), createUsuario);
router.put('/:id', verifyToken, checkRole('admin'), updateUsuario);

export default router;
