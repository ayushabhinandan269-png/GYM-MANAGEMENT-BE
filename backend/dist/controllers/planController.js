"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPlan = exports.buyPlan = exports.activatePlan = exports.deletePlan = exports.updatePlan = exports.getPlans = exports.createPlan = void 0;
const Plan_1 = __importDefault(require("../models/Plan"));
const User_1 = __importDefault(require("../models/User"));
/* CREATE PLAN */
const createPlan = async (req, res) => {
    try {
        const { name, duration, price, features, image } = req.body;
        const plan = await Plan_1.default.create({
            name,
            duration,
            price,
            features,
            image,
            isActive: true
        });
        res.status(201).json(plan);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create plan" });
    }
};
exports.createPlan = createPlan;
/* GET ALL PLANS */
const getPlans = async (req, res) => {
    try {
        const plans = await Plan_1.default.find().sort({ price: 1 });
        res.json(plans);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch plans" });
    }
};
exports.getPlans = getPlans;
/* UPDATE PLAN */
const updatePlan = async (req, res) => {
    try {
        const plan = await Plan_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update plan" });
    }
};
exports.updatePlan = updatePlan;
/* DELETE PLAN */
const deletePlan = async (req, res) => {
    try {
        await Plan_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Plan deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete plan" });
    }
};
exports.deletePlan = deletePlan;
/* ACTIVATE PLAN */
const activatePlan = async (req, res) => {
    try {
        const plan = await Plan_1.default.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        /* deactivate all plans */
        await Plan_1.default.updateMany({}, { isActive: false });
        /* activate selected plan */
        plan.isActive = true;
        await plan.save();
        res.json({
            message: "Plan activated successfully",
            plan
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to activate plan" });
    }
};
exports.activatePlan = activatePlan;
/* BUY PLAN */
const buyPlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;
        const plan = await Plan_1.default.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const startDate = new Date();
        let expiryDate = new Date();
        if (plan.duration === "Monthly") {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }
        if (plan.duration === "Quarterly") {
            expiryDate.setMonth(expiryDate.getMonth() + 3);
        }
        if (plan.duration === "Yearly") {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        }
        user.membershipPlan = plan._id;
        user.membershipStatus = "active";
        user.planStartDate = startDate;
        user.planExpiryDate = expiryDate;
        await user.save();
        res.json({
            message: "Plan purchased successfully",
            plan,
            startDate,
            expiryDate
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to buy plan" });
    }
};
exports.buyPlan = buyPlan;
/* GET MY PLAN */
const getMyPlan = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User_1.default.findById(userId)
            .populate("membershipPlan");
        res.json({
            plan: user?.membershipPlan,
            status: user?.membershipStatus,
            startDate: user?.planStartDate,
            expiryDate: user?.planExpiryDate
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch membership plan" });
    }
};
exports.getMyPlan = getMyPlan;
