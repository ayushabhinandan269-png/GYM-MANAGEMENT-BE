
import express from "express";

import {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  buyPlan,
  getMyPlan,
  activatePlan
} from "../controllers/planController";

import { protect, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

/* PUBLIC */

router.get("/", getPlans);

/* ADMIN */

router.patch(
  "/toggle/:id",
  protect,
  authorizeRoles("admin"),
  activatePlan
);
router.post("/", protect, authorizeRoles("admin"), createPlan);

router.put("/:id", protect, authorizeRoles("admin"), updatePlan);

router.delete("/:id", protect, authorizeRoles("admin"), deletePlan);


/* MEMBER */

router.post("/buy", protect, authorizeRoles("member"), buyPlan);

router.get("/my-plan", protect, authorizeRoles("member"), getMyPlan);

export default router;