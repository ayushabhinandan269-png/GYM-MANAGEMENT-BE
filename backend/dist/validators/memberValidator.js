"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignWorkoutValidator = void 0;
const express_validator_1 = require("express-validator");
exports.assignWorkoutValidator = [
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID required"),
    (0, express_validator_1.body)("workoutId").notEmpty().withMessage("Workout ID required")
];
