"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberWorkouts = exports.markWorkoutComplete = exports.assignWorkout = exports.deleteWorkout = exports.updateWorkout = exports.getWorkouts = exports.createWorkout = void 0;
const Workout_1 = __importDefault(require("../models/Workout"));
const User_1 = __importDefault(require("../models/User"));
/* CREATE WORKOUT */
const createWorkout = async (req, res) => {
    try {
        const { title, level, description, exercises, duration } = req.body;
        const workout = await Workout_1.default.create({
            title,
            level,
            description,
            exercises,
            duration,
            createdBy: req.user._id
        });
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create workout"
        });
    }
};
exports.createWorkout = createWorkout;
/* GET ALL WORKOUTS */
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout_1.default.find()
            .populate("createdBy", "name email");
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch workouts"
        });
    }
};
exports.getWorkouts = getWorkouts;
/* UPDATE WORKOUT */
const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) {
            return res.status(404).json({
                message: "Workout not found"
            });
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update workout"
        });
    }
};
exports.updateWorkout = updateWorkout;
/* DELETE WORKOUT */
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout_1.default.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({
                message: "Workout not found"
            });
        }
        res.json({
            message: "Workout deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete workout"
        });
    }
};
exports.deleteWorkout = deleteWorkout;
/* ASSIGN WORKOUT TO MEMBER */
const assignWorkout = async (req, res) => {
    try {
        const { memberId, workoutId } = req.body;
        const member = await User_1.default.findById(memberId);
        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }
        if (!member.assignedWorkouts) {
            member.assignedWorkouts = [];
        }
        member.assignedWorkouts.push({
            workout: workoutId,
            completed: false,
            completedAt: null
        });
        await member.save();
        res.json({
            message: "Workout assigned successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to assign workout"
        });
    }
};
exports.assignWorkout = assignWorkout;
const markWorkoutComplete = async (req, res) => {
    try {
        const { assignedId } = req.body;
        const userId = req.user._id;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const assignedWorkout = user.assignedWorkouts?.id(assignedId);
        if (!assignedWorkout) {
            return res.status(404).json({
                message: "Workout not assigned"
            });
        }
        assignedWorkout.completed = true;
        assignedWorkout.completedAt = new Date();
        await user.save();
        res.json({
            message: "Workout marked as completed"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update workout"
        });
    }
};
exports.markWorkoutComplete = markWorkoutComplete;
/* GET MEMBER WORKOUTS */
const getMemberWorkouts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User_1.default.findById(userId)
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
            message: "Failed to fetch member workouts"
        });
    }
};
exports.getMemberWorkouts = getMemberWorkouts;
