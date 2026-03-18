"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberController_1 = require("../controllers/memberController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
// ---------------- VALIDATIONS ----------------
const assignPlanValidator = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID required"),
    (0, express_validator_1.body)("planId").notEmpty().withMessage("Plan ID required")
];
const assignTrainerValidator = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID required"),
    (0, express_validator_1.body)("trainerId").notEmpty().withMessage("Trainer ID required")
];
const assignWorkoutValidator = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID required"),
    (0, express_validator_1.body)("workoutId").notEmpty().withMessage("Workout ID required")
];
const updateStatusValidator = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID required"),
    (0, express_validator_1.body)("status")
        .isIn(["active", "expired"])
        .withMessage("Invalid membership status")
];
// ================= ADMIN / TRAINER ROUTES =================
// GET ALL MEMBERS
router.get("/", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin", "trainer"), memberController_1.getMembers);
// DELETE MEMBER
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), memberController_1.deleteMember);
// ASSIGN MEMBERSHIP PLAN
router.post("/assign-plan", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), assignPlanValidator, validate_1.validate, memberController_1.assignPlan);
// UPDATE MEMBERSHIP STATUS
router.post("/update-status", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), updateStatusValidator, validate_1.validate, memberController_1.updateMembershipStatus);
// ASSIGN TRAINER
router.post("/assign-trainer", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), assignTrainerValidator, validate_1.validate, memberController_1.assignTrainer);
// ASSIGN WORKOUT
router.post("/assign-workout", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), assignWorkoutValidator, validate_1.validate, memberController_1.assignWorkout);
// ================= MEMBER ROUTES =================
// GET MY PROFILE
router.get("/me", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), memberController_1.getMyProfile);
// UPDATE MY PROFILE
router.put("/me", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), memberController_1.updateMyProfile);
// GET MY PLAN
router.get("/my-plan", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), memberController_1.getMyPlan);
// GET MY WORKOUTS
router.get("/my-workouts", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), memberController_1.getMyWorkouts);
exports.default = router;
