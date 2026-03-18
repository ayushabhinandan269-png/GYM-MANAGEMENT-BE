import { Request, Response } from "express";
import Workout from "../models/Workout";
import User from "../models/User";

/* CREATE WORKOUT */
export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { title, level, description, exercises, duration } = req.body;

    const workout = await Workout.create({
      title,
      level,
      description,
      exercises,
      duration,
      createdBy: (req as any).user._id
    });

    res.status(201).json(workout);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create workout"
    });
  }
};


/* GET ALL WORKOUTS */
export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate("createdBy", "name email");

    res.json(workouts);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workouts"
    });
  }
};


/* UPDATE WORKOUT */
export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found"
      });
    }

    res.json(workout);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update workout"
    });
  }
};


/* DELETE WORKOUT */
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found"
      });
    }

    res.json({
      message: "Workout deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete workout"
    });
  }
};


/* ASSIGN WORKOUT TO MEMBER */
export const assignWorkout = async (req: Request, res: Response) => {
  try {
    const { memberId, workoutId } = req.body;

    const member = await User.findById(memberId);

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

  } catch (error) {
    res.status(500).json({
      message: "Failed to assign workout"
    });
  }
};


export const markWorkoutComplete = async (req: Request, res: Response) => {
  try {
    const { assignedId } = req.body;
    const userId = (req as any).user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const assignedWorkout = (user.assignedWorkouts as any)?.id(assignedId);

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

  } catch (error) {
    res.status(500).json({
      message: "Failed to update workout"
    });
  }
};

/* GET MEMBER WORKOUTS */
export const getMemberWorkouts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const user = await User.findById(userId)
      .populate("assignedWorkouts.workout");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const workouts = (user.assignedWorkouts || [])
      .filter((w: any) => w.workout)
      .map((w: any) => ({
        assignedId: w._id,
        _id: (w.workout as any)._id,
        title: (w.workout as any).title,
        description: (w.workout as any).description,
        exercises: (w.workout as any).exercises,
        level: (w.workout as any).level,
        duration: (w.workout as any).duration,
        completed: w.completed,
        completedAt: w.completedAt
      }));

    res.json(workouts);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch member workouts"
    });
  }
};