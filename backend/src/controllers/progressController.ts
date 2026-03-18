import { Request, Response } from "express";
import WorkoutProgress from "../models/WorkoutProgress";


// GET MEMBER PROGRESS
export const getProgress = async (req: any, res: Response) => {
  try {

    const progress = await WorkoutProgress.find({
      member: req.user.id
    }).populate("workout");

    res.json(progress);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch progress"
    });

  }
};


// MARK EXERCISE COMPLETE
export const completeExercise = async (req: any, res: Response) => {
  try {

    const { workoutId, exercise } = req.body;

    let progress = await WorkoutProgress.findOne({
      member: req.user.id,
      workout: workoutId
    });

    if (!progress) {

      progress = await WorkoutProgress.create({
        member: req.user.id,
        workout: workoutId,
        completedExercises: [exercise]
      });

    } else {

      if (!progress.completedExercises.includes(exercise)) {
        progress.completedExercises.push(exercise);
      }

      await progress.save();

    }

    res.json(progress);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update progress"
    });

  }
};