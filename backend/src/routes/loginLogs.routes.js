import { Router } from "express";

import { getLoginLogs } from "../controllers/loginLogs.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { checkRole } from "../middleware/roles.js";

const router = Router();

// ======================================
// HISTORIAL DE INICIOS DE SESIÓN
// ======================================

router.get(
  "/",
  verifyToken,
  checkRole("admin"),
  getLoginLogs
);

export default router;