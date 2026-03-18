"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeExercise = exports.getProgress = void 0;
const WorkoutProgress_1 = __importDefault(require("../models/WorkoutProgress"));
// GET MEMBER PROGRESS
const getProgress = async (req, res) => {
    try {
        const progress = await WorkoutProgress_1.default.find({
            member: req.user.id
        }).populate("workout");
        res.json(progress);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch progress"
        });
    }
};
exports.getProgress = getProgress;
// MARK EXERCISE COMPLETE
const completeExercise = async (req, res) => {
    try {
        const { workoutId, exercise } = req.body;
        let progress = await WorkoutProgress_1.default.findOne({
            member: req.user.id,
            workout: workoutId
        });
        if (!progress) {
            progress = await WorkoutProgress_1.default.create({
                member: req.user.id,
                workout: workoutId,
                completedExercises: [exercise]
            });
        }
        else {
            if (!progress.completedExercises.includes(exercise)) {
                progress.completedExercises.push(exercise);
            }
            await progress.save();
        }
        res.json(progress);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update progress"
        });
    }
};
exports.completeExercise = completeExercise;
