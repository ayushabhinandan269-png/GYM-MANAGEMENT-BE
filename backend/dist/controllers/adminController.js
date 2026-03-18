"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const User_1 = __importDefault(require("../models/User"));
const Trainer_1 = __importDefault(require("../models/Trainer"));
const Plan_1 = __importDefault(require("../models/Plan"));
const getDashboardStats = async (req, res) => {
    try {
        const totalMembers = await User_1.default.countDocuments({ role: "member" });
        const activeMembers = await User_1.default.countDocuments({
            membershipStatus: "active"
        });
        const totalTrainers = await Trainer_1.default.countDocuments();
        const totalPlans = await Plan_1.default.countDocuments();
        res.json({
            totalMembers,
            activeMembers,
            totalTrainers,
            totalPlans
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
exports.getDashboardStats = getDashboardStats;
