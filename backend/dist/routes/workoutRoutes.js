"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutController_1 = require("../controllers/workoutController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
/* VALIDATION */
const workoutValidator = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Workout title required"),
    (0, express_validator_1.body)("level")
        .isIn(["Beginner", "Intermediate", "Advanced"])
        .withMessage("Invalid level"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description required"),
    (0, express_validator_1.body)("exercises")
        .optional()
        .isArray()
        .withMessage("Exercises must be an array"),
    (0, express_validator_1.body)("duration")
        .optional()
        .isNumeric()
        .withMessage("Duration must be number")
];
/* CREATE */
router.post("/", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), workoutValidator, validate_1.validate, workoutController_1.createWorkout);
/* GET ALL */
router.get("/", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin", "trainer", "member"), workoutController_1.getWorkouts);
/* UPDATE */
router.put("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), workoutValidator, validate_1.validate, workoutController_1.updateWorkout);
/* DELETE */
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), workoutController_1.deleteWorkout);
/* ASSIGN */
router.post("/assign", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin", "trainer"), (0, express_validator_1.body)("memberId").notEmpty().withMessage("Member ID required"), (0, express_validator_1.body)("workoutId").notEmpty().withMessage("Workout ID required"), validate_1.validate, workoutController_1.assignWorkout);
/* MEMBER WORKOUTS */
router.get("/member", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), workoutController_1.getMemberWorkouts);
/* MARK COMPLETE (FINAL FIXED) */
router.put("/complete", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), (0, express_validator_1.body)("assignedId")
    .notEmpty()
    .withMessage("Assigned workout ID required"), validate_1.validate, workoutController_1.markWorkoutComplete);
exports.default = router;
