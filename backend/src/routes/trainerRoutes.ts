import express from "express";

import {
  createTrainer,
  getTrainers,
  updateTrainer,
  deleteTrainer,
  assignTrainer,
  getAssignedMembers
} from "../controllers/trainerController";

import { protect, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();


// CREATE TRAINER (Admin only)
router.post("/", protect, authorizeRoles("admin"), createTrainer);


// GET ALL TRAINERS (Public or logged-in users)
router.get("/", getTrainers);


// UPDATE TRAINER (Admin only)
router.put("/:id", protect, authorizeRoles("admin"), updateTrainer);


// DELETE TRAINER (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteTrainer);


// ASSIGN TRAINER TO MEMBER (Admin)
router.post("/assign", protect, authorizeRoles("admin"), assignTrainer);


// TRAINER → VIEW ASSIGNED MEMBERS
router.get("/members", protect, authorizeRoles("trainer"), getAssignedMembers);


export default router;