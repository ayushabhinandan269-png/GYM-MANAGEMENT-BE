"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMyProfile = exports.getMyPlan = exports.getMyProfile = exports.getMyWorkouts = exports.assignWorkout = exports.assignTrainer = exports.updateMembershipStatus = exports.assignPlan = exports.getMembers = void 0;
const User_1 = __importDefault(require("../models/User"));
// GET ALL MEMBERS
const getMembers = async (req, res) => {
    try {
        const members = await User_1.default.find({ role: "member" })
            .populate("membershipPlan")
            .populate("trainerAssigned")
            .populate("assignedWorkouts.workout");
        res.json(members);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch members"
        });
    }
};
exports.getMembers = getMembers;
// ASSIGN MEMBERSHIP PLAN
const assignPlan = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            membershipPlan: planId,
            membershipStatus: "active"
        }, { new: true }).populate("membershipPlan");
        if (!user) {
            return res.status(404).json({ message: "Member not found" });
        }
        const io = req.app.get("io");
        io.emit("activity", {
            type: "plan_assigned",
            message: `Membership plan assigned to ${user.name}`,
            member: user,
            time: new Date()
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to assign plan"
        });
    }
};
exports.assignPlan = assignPlan;
// UPDATE MEMBERSHIP STATUS
const updateMembershipStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, { membershipStatus: status }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Member not found" });
        }
        const io = req.app.get("io");
        io.emit("activity", {
            type: "membership_updated",
            message: `Membership status updated for ${user.name}`,
            member: user,
            time: new Date()
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update status"
        });
    }
};
exports.updateMembershipStatus = updateMembershipStatus;
// ASSIGN TRAINER
const assignTrainer = async (req, res) => {
    try {
        const { userId, trainerId } = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, { trainerAssigned: trainerId }, { new: true }).populate("trainerAssigned");
        if (!user) {
            return res.status(404).json({ message: "Member not found" });
        }
        const io = req.app.get("io");
        io.emit("activity", {
            type: "trainer_assigned",
            message: `Trainer assigned to ${user.name}`,
            member: user,
            time: new Date()
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to assign trainer"
        });
    }
};
exports.assignTrainer = assignTrainer;
// ASSIGN WORKOUT TO MEMBER
const assignWorkout = async (req, res) => {
    try {
        const { userId, workoutId } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Member not found" });
        }
        if (!user.assignedWorkouts) {
            user.assignedWorkouts = [];
        }
        user.assignedWorkouts.push({
            workout: workoutId,
            completed: false,
            completedAt: null
        });
        await user.save();
        const updatedUser = await User_1.default.findById(userId)
            .populate("membershipPlan")
            .populate("trainerAssigned")
            .populate("assignedWorkouts.workout");
        const io = req.app.get("io");
        io.emit("activity", {
            type: "workout_assigned",
            message: `Workout assigned to ${user.name}`,
            member: updatedUser,
            time: new Date()
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to assign workout"
        });
    }
};
exports.assignWorkout = assignWorkout;
// GET MEMBER WORKOUTS
const getMyWorkouts = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id)
            .populate("assignedWorkouts.workout");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const workouts = (user.assignedWorkouts || [])
            .filter((w) => w.workout)
            .map((w) => ({
            assignedId: w._id,
            _id: w.workout._id,
            title: w.workout.title,
            description: w.workout.description,
            exercises: w.workout.exercises,
            level: w.workout.level,
            duration: w.workout.duration,
            completed: w.completed,
            completedAt: w.completedAt
        }));
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch workouts"
        });
    }
};
exports.getMyWorkouts = getMyWorkouts;
// GET MY PROFILE
const getMyProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id)
            .populate("membershipPlan")
            .populate("trainerAssigned");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile"
        });
    }
};
exports.getMyProfile = getMyProfile;
// GET MY PLAN
const getMyPlan = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id)
            .populate("membershipPlan");
        res.json(user?.membershipPlan);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch membership plan"
        });
    }
};
exports.getMyPlan = getMyPlan;
// UPDATE MY PROFILE
const updateMyProfile = async (req, res) => {
    try {
        const { phone, age, gender } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.user.id, { phone, age, gender }, { new: true })
            .populate("membershipPlan")
            .populate("trainerAssigned");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update profile"
        });
    }
};
exports.updateMyProfile = updateMyProfile;
// DELETE MEMBER (ADMIN)
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
            message: `Member ${user.name} deleted`,
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
