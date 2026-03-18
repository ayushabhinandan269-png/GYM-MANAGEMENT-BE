import { Request, Response } from "express";
import Plan from "../models/Plan";
import User from "../models/User";

/* CREATE PLAN */

export const createPlan = async (req: Request, res: Response) => {
  try {

    const { name, duration, price, features, image } = req.body;

    const plan = await Plan.create({
      name,
      duration,
      price,
      features,
      image,
      isActive: true
    });

    res.status(201).json(plan);

  } catch (error) {

    res.status(500).json({ message: "Failed to create plan" });

  }
};

/* GET ALL PLANS */

export const getPlans = async (req: Request, res: Response) => {
  try {

    const plans = await Plan.find().sort({ price: 1 });

    res.json(plans);

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch plans" });

  }
};


/* UPDATE PLAN */

export const updatePlan = async (req: Request, res: Response) => {
  try {

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(plan);

  } catch (error) {

    res.status(500).json({ message: "Failed to update plan" });

  }
};


/* DELETE PLAN */

export const deletePlan = async (req: Request, res: Response) => {
  try {

    await Plan.findByIdAndDelete(req.params.id);

    res.json({ message: "Plan deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: "Failed to delete plan" });

  }
};


/* ACTIVATE PLAN */

export const activatePlan = async (req: Request, res: Response) => {

  try {

    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    /* deactivate all plans */

    await Plan.updateMany({}, { isActive: false });

    /* activate selected plan */

    plan.isActive = true;

    await plan.save();

    res.json({
      message: "Plan activated successfully",
      plan
    });

  } catch (error) {

    res.status(500).json({ message: "Failed to activate plan" });

  }

};


/* BUY PLAN */

export const buyPlan = async (req: Request, res: Response) => {
  try {

    const { planId } = req.body;

    const userId = (req as any).user._id;

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const startDate = new Date();

    let expiryDate = new Date();

    if (plan.duration === "Monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    if (plan.duration === "Quarterly") {
      expiryDate.setMonth(expiryDate.getMonth() + 3);
    }

    if (plan.duration === "Yearly") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    user.membershipPlan = plan._id;
    user.membershipStatus = "active";
    user.planStartDate = startDate;
    user.planExpiryDate = expiryDate;

    await user.save();

    res.json({
      message: "Plan purchased successfully",
      plan,
      startDate,
      expiryDate
    });

  } catch (error) {

    res.status(500).json({ message: "Failed to buy plan" });

  }
};


/* GET MY PLAN */

export const getMyPlan = async (req: Request, res: Response) => {

  try {

    const userId = (req as any).user._id;

    const user = await User.findById(userId)
      .populate("membershipPlan");

    res.json({
      plan: user?.membershipPlan,
      status: user?.membershipStatus,
      startDate: user?.planStartDate,
      expiryDate: user?.planExpiryDate
    });

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch membership plan" });

  }

};