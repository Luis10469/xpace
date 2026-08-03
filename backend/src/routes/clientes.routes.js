import { Router } from 'express';
import {
  getClientes,
  getClienteById,
  getMiServicio,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clientes.controller.js';

import { verifyToken } from '../middleware/auth.js';
import { checkRole } from '../middleware/roles.js';

const router = Router();

// ======================================
// RUTAS ADMIN
// ======================================

router.get('/', verifyToken, checkRole('admin'), getClientes);

router.post('/', verifyToken, checkRole('admin'), createCliente);

router.put('/:id', verifyToken, checkRole('admin'), updateCliente);

router.delete('/:id', verifyToken, checkRole('admin'), deleteCliente);

// ======================================
// SERVICIO DEL CLIENTE LOGUEADO
// ======================================

router.get(
  '/mi-servicio',
  verifyToken,
  getMiServicio
);

// ======================================
// CONSULTAR CLIENTE POR ID
// ======================================

router.get('/:id', verifyToken, getClienteById);

export default router;
