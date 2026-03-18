import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import planRoutes from "./routes/planRoutes";
import trainerRoutes from "./routes/trainerRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import memberRoutes from "./routes/memberRoutes";
import adminRoutes from "./routes/adminRoutes";
import dashboardRoutes from "./routes/dashboardRoutes"; 
import progressRoutes from "./routes/progressRoutes";
import membershipRoutes from "./routes/membershipRoutes";
import nutritionRoutes from "./routes/nutritionRoutes";

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes); 
app.use("/api/progress", progressRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/nutrition", nutritionRoutes);

/* HEALTH */
app.get("/", (req, res) => {
  res.send("Gym Management API Running");
});

/* 404 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

export default app;