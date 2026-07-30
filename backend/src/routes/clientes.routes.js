import { Router } from 'express';
import { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } from '../controllers/clientes.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { checkRole } from '../middleware/roles.js';

const router = Router();

router.get('/', verifyToken, checkRole('admin'), getClientes);
router.get('/:id', verifyToken, getClienteById);
router.post('/', verifyToken, checkRole('admin'), createCliente);
router.put('/:id', verifyToken, checkRole('admin'), updateCliente);
router.delete('/:id', verifyToken, checkRole('admin'), deleteCliente);

export default router;
