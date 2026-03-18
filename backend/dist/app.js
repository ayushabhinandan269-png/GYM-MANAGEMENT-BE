"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const trainerRoutes_1 = __importDefault(require("./routes/trainerRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const progressRoutes_1 = __importDefault(require("./routes/progressRoutes"));
const membershipRoutes_1 = __importDefault(require("./routes/membershipRoutes"));
const nutritionRoutes_1 = __importDefault(require("./routes/nutritionRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ROUTES */
app.use("/api/auth", authRoutes_1.default);
app.use("/api/plans", planRoutes_1.default);
app.use("/api/trainers", trainerRoutes_1.default);
app.use("/api/workouts", workoutRoutes_1.default);
app.use("/api/members", memberRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api/progress", progressRoutes_1.default);
app.use("/api/memberships", membershipRoutes_1.default);
app.use("/api/nutrition", nutritionRoutes_1.default);
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
exports.default = app;
