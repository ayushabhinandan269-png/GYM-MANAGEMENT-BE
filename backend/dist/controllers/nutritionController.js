"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklyNutrition = exports.generateMealPlan = exports.getDietSuggestion = exports.getMyNutrition = exports.addMeal = void 0;
const axios_1 = __importDefault(require("axios"));
const Nutrition_1 = __importDefault(require("../models/Nutrition"));
/* ---------------- HELPER ---------------- */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const groqRequest = async (messages) => {
    return axios_1.default.post(GROQ_URL, {
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.2
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        }
    });
};
/* ---------------- ADD MEAL ---------------- */
const addMeal = async (req, res) => {
    try {
        const { mealText } = req.body;
        const userId = req.user.id;
        const response = await groqRequest([
            {
                role: "user",
                content: `
Calculate nutrition for: ${mealText}

Return ONLY JSON:
{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number
}`
            }
        ]);
        const content = response.data?.choices?.[0]?.message?.content || "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const parsed = jsonMatch
            ? JSON.parse(jsonMatch[0])
            : { calories: 300, protein: 10, carbs: 40, fats: 10 };
        const mealData = {
            name: mealText,
            ...parsed
        };
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        let today = await Nutrition_1.default.findOne({
            user: userId,
            date: { $gte: startOfDay }
        });
        if (!today) {
            today = new Nutrition_1.default({
                user: userId,
                meals: [],
                totalCalories: 0
            });
        }
        today.meals.push(mealData);
        today.totalCalories += mealData.calories;
        await today.save();
        res.json(today);
    }
    catch (err) {
        console.log("GROQ ERROR:", err.response?.data || err.message);
        res.status(500).json({
            message: "AI failed",
            error: err.response?.data || err.message
        });
    }
};
exports.addMeal = addMeal;
/* ---------------- GET TODAY ---------------- */
const getMyNutrition = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const today = await Nutrition_1.default.findOne({
            user: req.user.id,
            date: { $gte: startOfDay }
        });
        res.json(today || { meals: [], totalCalories: 0 });
    }
    catch {
        res.status(500).json({ message: "Fetch failed" });
    }
};
exports.getMyNutrition = getMyNutrition;
/* ---------------- AI DIET SUGGESTION ---------------- */
const getDietSuggestion = async (req, res) => {
    try {
        const { goal, weight } = req.body;
        const response = await groqRequest([
            {
                role: "user",
                content: `
You are a fitness nutrition expert.

Goal: ${goal}
Weight: ${weight}kg

Give short diet advice + daily calorie target.
`
            }
        ]);
        const content = response.data?.choices?.[0]?.message?.content || "No suggestion";
        res.json({ suggestion: content });
    }
    catch (err) {
        res.status(500).json({
            message: "AI failed",
            error: err.response?.data || err.message
        });
    }
};
exports.getDietSuggestion = getDietSuggestion;
/* ---------------- MEAL PLAN ---------------- */
const generateMealPlan = async (req, res) => {
    try {
        const { goal } = req.body;
        const response = await groqRequest([
            {
                role: "user",
                content: `
Create a 1-day meal plan for ${goal}.
Include breakfast, lunch, dinner.
Keep it simple.
`
            }
        ]);
        const content = response.data?.choices?.[0]?.message?.content || "No plan generated";
        res.json({ plan: content });
    }
    catch (err) {
        res.status(500).json({
            message: "AI failed",
            error: err.response?.data || err.message
        });
    }
};
exports.generateMealPlan = generateMealPlan;
/* ---------------- WEEKLY ANALYTICS ---------------- */
const getWeeklyNutrition = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const start = new Date();
        start.setDate(today.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        const records = await Nutrition_1.default.find({
            user: userId,
            date: { $gte: start }
        });
        const daysMap = {};
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const key = d.toISOString().split("T")[0];
            daysMap[key] = {
                day: d.toLocaleDateString("en-US", { weekday: "short" }),
                calories: 0
            };
        }
        records.forEach((rec) => {
            const key = new Date(rec.date).toISOString().split("T")[0];
            if (daysMap[key]) {
                daysMap[key].calories = rec.totalCalories;
            }
        });
        const weekly = Object.values(daysMap).reverse();
        const total = weekly.reduce((sum, d) => sum + d.calories, 0);
        const avg = Math.round(total / 7);
        res.json({
            weekly,
            insights: {
                averageCalories: avg,
                totalDaysTracked: weekly.filter((d) => d.calories > 0).length
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Weekly fetch failed" });
    }
};
exports.getWeeklyNutrition = getWeeklyNutrition;
