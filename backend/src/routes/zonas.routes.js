import { Router } from "express";

import {
  getZonas,
  getZonaById,
  createZona,
  updateZona,
  deleteZona,
} from "../controllers/zonas.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { checkRole } from "../middleware/roles.js";

const router = Router();

router.get("/", verifyToken, getZonas);

router.get("/:id", verifyToken, getZonaById);

router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  createZona
);

router.put(
  "/:id",
  verifyToken,
  checkRole("admin"),
  updateZona
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  deleteZona
);

export default router;