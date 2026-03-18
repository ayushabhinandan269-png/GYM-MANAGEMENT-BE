import { Request, Response } from "express";
import Membership from "../models/Membership";
import Plan from "../models/Plan";
import User from "../models/User";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const purchaseMembership = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { planId } = req.body;

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Prevent buying multiple active memberships
    const existingMembership = await Membership.findOne({
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

    const membership = await Membership.create({
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

  } catch (error) {

    console.error("Membership purchase error:", error);

    res.status(500).json({
      message: "Membership purchase failed"
    });

  }
};
export const getMyMembership = async (req: any, res: Response) => {

  try {

    const userId = req.user.id;

    const membership = await Membership.findOne({
      user: userId,
      status: "active"
    }).populate("plan");

    if (!membership) {
      return res.status(404).json({
        message: "No active membership"
      });
    }

    res.json(membership);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch membership"
    });

  }

};

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
      message: `Member ${user.name} was removed`,
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