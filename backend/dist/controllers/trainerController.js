"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedMembers = exports.assignTrainer = exports.deleteTrainer = exports.updateTrainer = exports.getTrainers = exports.createTrainer = void 0;
const Trainer_1 = __importDefault(require("../models/Trainer"));
const User_1 = __importDefault(require("../models/User"));
// CREATE TRAINER
const createTrainer = async (req, res) => {
    try {
        const trainer = await Trainer_1.default.create(req.body);
        res.status(201).json(trainer);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create trainer" });
    }
};
exports.createTrainer = createTrainer;
// GET ALL TRAINERS
const getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer_1.default.find();
        res.json(trainers);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch trainers" });
    }
};
exports.getTrainers = getTrainers;
// UPDATE TRAINER
const updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(trainer);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update trainer" });
    }
};
exports.updateTrainer = updateTrainer;
// DELETE TRAINER
const deleteTrainer = async (req, res) => {
    try {
        await Trainer_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Trainer deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete trainer" });
    }
};
exports.deleteTrainer = deleteTrainer;
/*
ASSIGN TRAINER TO MEMBER (ADMIN)
*/
const assignTrainer = async (req, res) => {
    try {
        const { userId, trainerId } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const trainer = await Trainer_1.default.findById(trainerId);
        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        user.trainerAssigned = trainer._id;
        await user.save();
        res.json({
            message: "Trainer assigned successfully",
            trainer,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to assign trainer" });
    }
};
exports.assignTrainer = assignTrainer;
/*
TRAINER → VIEW ASSIGNED MEMBERS
*/
const getAssignedMembers = async (req, res) => {
    try {
        const trainerId = req.user._id;
        const members = await User_1.default.find({
            trainerAssigned: trainerId,
        }).select("-password");
        res.json(members);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch members" });
    }
};
exports.getAssignedMembers = getAssignedMembers;
