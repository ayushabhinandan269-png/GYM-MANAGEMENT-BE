import { Request, Response } from "express";
import User from "../models/User";


// GET ALL MEMBERS
export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await User.find({ role: "member" })
      .populate("membershipPlan")
      .populate("trainerAssigned")
      .populate("assignedWorkouts.workout");

    res.json(members);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch members"
    });
  }
};


// ASSIGN MEMBERSHIP PLAN
export const assignPlan = async (req: Request, res: Response) => {
  try {
    const { userId, planId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        membershipPlan: planId,
        membershipStatus: "active"
      },
      { new: true }
    ).populate("membershipPlan");

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

  } catch (error) {
    res.status(500).json({
      message: "Failed to assign plan"
    });
  }
};


// UPDATE MEMBERSHIP STATUS
export const updateMembershipStatus = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { membershipStatus: status },
      { new: true }
    );

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

  } catch (error) {
    res.status(500).json({
      message: "Failed to update status"
    });
  }
};


// ASSIGN TRAINER
export const assignTrainer = async (req: Request, res: Response) => {
  try {
    const { userId, trainerId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { trainerAssigned: trainerId },
      { new: true }
    ).populate("trainerAssigned");

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

  } catch (error) {
    res.status(500).json({
      message: "Failed to assign trainer"
    });
  }
};


// ASSIGN WORKOUT TO MEMBER
export const assignWorkout = async (req: Request, res: Response) => {
  try {
    const { userId, workoutId } = req.body;

    const user = await User.findById(userId);

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

    const updatedUser = await User.findById(userId)
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

  } catch (error) {
    res.status(500).json({
      message: "Failed to assign workout"
    });
  }
};


// GET MEMBER WORKOUTS
export const getMyWorkouts = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
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

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workouts"
    });
  }
};


// GET MY PROFILE
export const getMyProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("membershipPlan")
      .populate("trainerAssigned");

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};


// GET MY PLAN
export const getMyPlan = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("membershipPlan");

    res.json(user?.membershipPlan);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch membership plan"
    });
  }
};


// UPDATE MY PROFILE
export const updateMyProfile = async (req: any, res: Response) => {
  try {
    const { phone, age, gender } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { phone, age, gender },
      { new: true }
    )
      .populate("membershipPlan")
      .populate("trainerAssigned");

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile"
    });
  }
};


// DELETE MEMBER (ADMIN)
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

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

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete member"
    });
  }
};