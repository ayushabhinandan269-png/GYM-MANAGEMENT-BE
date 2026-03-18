import express from "express";
import {
  getProgress,
  completeExercise
} from "../controllers/progressController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getProgress);

router.post("/complete-exercise", protect, completeExercise);

export default router;