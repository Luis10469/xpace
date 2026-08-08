import { Router } from "express";

import {
  getDashboard,
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getMensajes,
  enviarMensaje,
  getHistorial,
  getTecnicos,
} from "../controllers/tickets.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { checkRole } from "../middleware/roles.js";

const router = Router();

// ======================================
// DASHBOARD
// ======================================

router.get(
  "/dashboard",
  verifyToken,
  getDashboard
);

// ======================================
// TÉCNICOS
// ======================================

router.get(
  "/tecnicos",
  verifyToken,
  checkRole("admin"),
  getTecnicos
);

// ======================================
// LISTAR TICKETS
// ======================================

router.get(
  "/",
  verifyToken,
  getTickets
);

// ======================================
// MENSAJES
// ======================================

router.get(
  "/:id/mensajes",
  verifyToken,
  getMensajes
);

router.post(
  "/:id/mensajes",
  verifyToken,
  enviarMensaje
);

// ======================================
// HISTORIAL
// ======================================

router.get(
  "/:id/historial",
  verifyToken,
  getHistorial
);

// ======================================
// TICKET POR ID
// ======================================

router.get(
  "/:id",
  verifyToken,
  getTicketById
);

// ======================================
// CREAR TICKET
// ======================================

router.post(
  "/",
  verifyToken,
  createTicket
);

// ======================================
// ACTUALIZAR TICKET
// ======================================

router.put(
  "/:id",
  verifyToken,
  checkRole("admin"),
  updateTicket
);

// ======================================
// ELIMINAR TICKET
// ======================================

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  deleteTicket
);

export default router;
