import { Router } from 'express';

import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  convertirCliente
} from '../controllers/usuarios.controller.js';

import { verifyToken } from '../middleware/auth.js';
import { checkRole } from '../middleware/roles.js';

const router = Router();

// Obtener usuarios
router.get('/', verifyToken, checkRole('admin'), getUsuarios);

// Crear usuario
router.post('/', verifyToken, checkRole('admin'), createUsuario);

// Convertir usuario en cliente
router.post(
  '/:id/convertir',
  verifyToken,
  checkRole('admin'),
  convertirCliente
);

// Actualizar usuario
router.put('/:id', verifyToken, checkRole('admin'), updateUsuario);

export default router;