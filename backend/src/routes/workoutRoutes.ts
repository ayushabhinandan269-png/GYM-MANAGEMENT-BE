import express from "express";

import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  assignWorkout,
  markWorkoutComplete,
  getMemberWorkouts
} from "../controllers/workoutController";

import { protect, authorizeRoles } from "../middleware/authMiddleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = express.Router();

/* VALIDATION */

const workoutValidator = [

  body("title").notEmpty().withMessage("Workout title required"),

  body("level")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid level"),

  body("description").notEmpty().withMessage("Description required"),

  body("exercises")
    .optional()
    .isArray()
    .withMessage("Exercises must be an array"),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be number")

];

/* CREATE */
router.post("/", protect, authorizeRoles("admin"), workoutValidator, validate, createWorkout);

/* GET ALL */
router.get("/", protect, authorizeRoles("admin","trainer","member"), getWorkouts);

/* UPDATE */
router.put("/:id", protect, authorizeRoles("admin"), workoutValidator, validate, updateWorkout);

/* DELETE */
router.delete("/:id", protect, authorizeRoles("admin"), deleteWorkout);

/* ASSIGN */
router.post(
  "/assign",
  protect,
  authorizeRoles("admin","trainer"),
  body("memberId").notEmpty().withMessage("Member ID required"),
  body("workoutId").notEmpty().withMessage("Workout ID required"),
  validate,
  assignWorkout
);

/* MEMBER WORKOUTS */
router.get(
  "/member",
  protect,
  authorizeRoles("member"),
  getMemberWorkouts
);

/* MARK COMPLETE (FINAL FIXED) */
router.put(
  "/complete",
  protect,
  authorizeRoles("member"),
  body("assignedId")
    .notEmpty()
    .withMessage("Assigned workout ID required"),
  validate,
  markWorkoutComplete
);

export default router;