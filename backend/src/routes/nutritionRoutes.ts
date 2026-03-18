import express from "express";
import {
  addMeal,
  getMyNutrition,
  getDietSuggestion,  
  generateMealPlan,
  getWeeklyNutrition     
} from "../controllers/nutritionController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

/* ---------------- BASIC ---------------- */

router.post("/add", protect, addMeal);
router.get("/me", protect, getMyNutrition);

/* ---------------- AI FEATURES ---------------- */

router.post("/ai-suggest", protect, getDietSuggestion);
router.post("/meal-plan", protect, generateMealPlan);
router.get("/weekly", protect, getWeeklyNutrition);

export default router;