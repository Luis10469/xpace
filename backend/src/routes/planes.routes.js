import { Router } from "express";

import {

  getPlanes,
  getPlanesPublicos,
  createPlan,
  updatePlan,
  deletePlan,

} from "../controllers/planes.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { checkRole } from "../middleware/roles.js";

const router = Router();

// ==========================
// RUTA PÚBLICA
// ==========================

router.get("/public", getPlanesPublicos);

// ==========================
// ADMIN
// ==========================

router.get("/", getPlanes);

router.post(
  "/",
  verifyToken,
  checkRole("admin"),
  createPlan
);

router.put(
  "/:id",
  verifyToken,
  checkRole("admin"),
  updatePlan
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  deletePlan
);

export default router;
