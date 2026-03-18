"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerController_1 = require("../controllers/trainerController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// CREATE TRAINER (Admin only)
router.post("/", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), trainerController_1.createTrainer);
// GET ALL TRAINERS (Public or logged-in users)
router.get("/", trainerController_1.getTrainers);
// UPDATE TRAINER (Admin only)
router.put("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), trainerController_1.updateTrainer);
// DELETE TRAINER (Admin only)
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), trainerController_1.deleteTrainer);
// ASSIGN TRAINER TO MEMBER (Admin)
router.post("/assign", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), trainerController_1.assignTrainer);
// TRAINER → VIEW ASSIGNED MEMBERS
router.get("/members", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("trainer"), trainerController_1.getAssignedMembers);
exports.default = router;
