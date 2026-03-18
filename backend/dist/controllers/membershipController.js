"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.getMyMembership = exports.purchaseMembership = void 0;
const Membership_1 = __importDefault(require("../models/Membership"));
const Plan_1 = __importDefault(require("../models/Plan"));
const User_1 = __importDefault(require("../models/User"));
const purchaseMembership = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { planId } = req.body;
        const plan = await Plan_1.default.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        // Prevent buying multiple active memberships
        const existingMembership = await Membership_1.default.findOne({
            user: userId,
            status: "active"
        });
        if (existingMembership) {
            return res.status(400).json({
                message: "You already have an active membership"
            });
        }
        const startDate = new Date();
        const endDate = new Date();
        // Assuming plan.duration = months
        endDate.setMonth(endDate.getMonth() + 1);
        const membership = await Membership_1.default.create({
            user: userId,
            plan: planId,
            startDate,
            endDate,
            status: "active"
        });
        res.status(201).json({
            message: "Membership activated",
            membership
        });
    }
    catch (error) {
        console.error("Membership purchase error:", error);
        res.status(500).json({
            message: "Membership purchase failed"
        });
    }
};
exports.purchaseMembership = purchaseMembership;
const getMyMembership = async (req, res) => {
    try {
        const userId = req.user.id;
        const membership = await Membership_1.default.findOne({
            user: userId,
            status: "active"
        }).populate("plan");
        if (!membership) {
            return res.status(404).json({
                message: "No active membership"
            });
        }
        res.json(membership);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch membership"
        });
    }
};
exports.getMyMembership = getMyMembership;
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                message: "Member not found"
            });
        }
        const io = req.app.get("io");
        io.emit("activity", {
            type: "member_deleted",
            message: `Member ${user.name} was removed`,
            member: user,
            time: new Date()
        });
        res.json({
            message: "Member deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete member"
        });
    }
};
exports.deleteMember = deleteMember;
