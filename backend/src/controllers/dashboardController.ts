import User from "../models/User";
import Trainer from "../models/Trainer";
import Plan from "../models/Plan";
import Workout from "../models/Workout";

export const getDashboardStats = async (req:any,res:any) => {

 try {

  const members = await User.countDocuments({ role:"member" });
  const trainers = await Trainer.countDocuments();
  const plans = await Plan.countDocuments();
  const workouts = await Workout.countDocuments();

  res.json({
    members,
    trainers,
    plans,
    workouts
  });

 } catch(err) {

  res.status(500).json({ message:"Server error" });

 }

};