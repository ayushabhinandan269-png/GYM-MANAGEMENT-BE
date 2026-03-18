import { Request, Response } from "express";
import User from "../models/User";
import Trainer from "../models/Trainer";
import Plan from "../models/Plan";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalMembers = await User.countDocuments({ role: "member" });

    const activeMembers = await User.countDocuments({
      membershipStatus: "active"
    });

    const totalTrainers = await Trainer.countDocuments();

    const totalPlans = await Plan.countDocuments();

    res.json({
      totalMembers,
      activeMembers,
      totalTrainers,
      totalPlans
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};