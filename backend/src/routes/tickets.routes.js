import { Router } from 'express';
import { getTickets, createTicket, responderTicket } from '../controllers/tickets.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, getTickets);
router.post('/', verifyToken, createTicket);
router.put('/:id/responder', verifyToken, responderTicket);

export default router;
