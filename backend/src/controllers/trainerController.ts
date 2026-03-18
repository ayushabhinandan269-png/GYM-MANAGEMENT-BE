import { Request, Response } from "express";
import Trainer from "../models/Trainer";
import User from "../models/User";



// CREATE TRAINER
export const createTrainer = async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Failed to create trainer" });
  }
};



// GET ALL TRAINERS
export const getTrainers = async (req: Request, res: Response) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trainers" });
  }
};



// UPDATE TRAINER
export const updateTrainer = async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Failed to update trainer" });
  }
};



// DELETE TRAINER
export const deleteTrainer = async (req: Request, res: Response) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trainer" });
  }
};



/*
ASSIGN TRAINER TO MEMBER (ADMIN)
*/
export const assignTrainer = async (req: Request, res: Response) => {
  try {

    const { userId, trainerId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    user.trainerAssigned = trainer._id;

    await user.save();

    res.json({
      message: "Trainer assigned successfully",
      trainer,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to assign trainer" });
  }
};



/*
TRAINER → VIEW ASSIGNED MEMBERS
*/
export const getAssignedMembers = async (req: Request, res: Response) => {
  try {

    const trainerId = (req as any).user._id;

    const members = await User.find({
      trainerAssigned: trainerId,
    }).select("-password");

    res.json(members);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
};