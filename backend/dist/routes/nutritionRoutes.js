"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nutritionController_1 = require("../controllers/nutritionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/* ---------------- BASIC ---------------- */
router.post("/add", authMiddleware_1.protect, nutritionController_1.addMeal);
router.get("/me", authMiddleware_1.protect, nutritionController_1.getMyNutrition);
/* ---------------- AI FEATURES ---------------- */
router.post("/ai-suggest", authMiddleware_1.protect, nutritionController_1.getDietSuggestion);
router.post("/meal-plan", authMiddleware_1.protect, nutritionController_1.generateMealPlan);
router.get("/weekly", authMiddleware_1.protect, nutritionController_1.getWeeklyNutrition);
exports.default = router;
