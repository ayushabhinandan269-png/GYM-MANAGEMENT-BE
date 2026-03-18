import express from "express";

import {
  getMembers,
  assignPlan,
  updateMembershipStatus,
  assignTrainer,
  assignWorkout,
  getMyWorkouts,
  getMyProfile,
  getMyPlan,
  updateMyProfile,
  deleteMember
} from "../controllers/memberController";

import { protect, authorizeRoles } from "../middleware/authMiddleware";

import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = express.Router();


// ---------------- VALIDATIONS ----------------

const assignPlanValidator = [
  body("userId").notEmpty().withMessage("User ID required"),
  body("planId").notEmpty().withMessage("Plan ID required")
];

const assignTrainerValidator = [
  body("userId").notEmpty().withMessage("User ID required"),
  body("trainerId").notEmpty().withMessage("Trainer ID required")
];

const assignWorkoutValidator = [
  body("userId").notEmpty().withMessage("User ID required"),
  body("workoutId").notEmpty().withMessage("Workout ID required")
];

const updateStatusValidator = [
  body("userId").notEmpty().withMessage("User ID required"),
  body("status")
    .isIn(["active", "expired"])
    .withMessage("Invalid membership status")
];


// ================= ADMIN / TRAINER ROUTES =================


// GET ALL MEMBERS
router.get(
  "/",
  protect,
  authorizeRoles("admin", "trainer"),
  getMembers
);

// DELETE MEMBER

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteMember
);

// ASSIGN MEMBERSHIP PLAN
router.post(
  "/assign-plan",
  protect,
  authorizeRoles("admin"),
  assignPlanValidator,
  validate,
  assignPlan
);


// UPDATE MEMBERSHIP STATUS
router.post(
  "/update-status",
  protect,
  authorizeRoles("admin"),
  updateStatusValidator,
  validate,
  updateMembershipStatus
);


// ASSIGN TRAINER
router.post(
  "/assign-trainer",
  protect,
  authorizeRoles("admin"),
  assignTrainerValidator,
  validate,
  assignTrainer
);


// ASSIGN WORKOUT
router.post(
  "/assign-workout",
  protect,
  authorizeRoles("admin"),
  assignWorkoutValidator,
  validate,
  assignWorkout
);


// ================= MEMBER ROUTES =================


// GET MY PROFILE
router.get(
  "/me",
  protect,
  authorizeRoles("member"),
  getMyProfile
);


// UPDATE MY PROFILE
router.put(
  "/me",
  protect,
  authorizeRoles("member"),
  updateMyProfile
);


// GET MY PLAN
router.get(
  "/my-plan",
  protect,
  authorizeRoles("member"),
  getMyPlan
);


// GET MY WORKOUTS
router.get(
  "/my-workouts",
  protect,
  authorizeRoles("member"),
  getMyWorkouts
);


export default router;