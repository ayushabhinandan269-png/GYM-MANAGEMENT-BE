import { body } from "express-validator";

export const assignWorkoutValidator = [
  body("userId").notEmpty().withMessage("User ID required"),
  body("workoutId").notEmpty().withMessage("Workout ID required")
];