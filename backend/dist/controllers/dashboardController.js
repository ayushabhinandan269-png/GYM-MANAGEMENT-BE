"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const User_1 = __importDefault(require("../models/User"));
const Trainer_1 = __importDefault(require("../models/Trainer"));
const Plan_1 = __importDefault(require("../models/Plan"));
const Workout_1 = __importDefault(require("../models/Workout"));
const getDashboardStats = async (req, res) => {
    try {
        const members = await User_1.default.countDocuments({ role: "member" });
        const trainers = await Trainer_1.default.countDocuments();
        const plans = await Plan_1.default.countDocuments();
        const workouts = await Workout_1.default.countDocuments();
        res.json({
            members,
            trainers,
            plans,
            workouts
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getDashboardStats = getDashboardStats;
