"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planController_1 = require("../controllers/planController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/* PUBLIC */
router.get("/", planController_1.getPlans);
/* ADMIN */
router.patch("/toggle/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), planController_1.activatePlan);
router.post("/", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), planController_1.createPlan);
router.put("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), planController_1.updatePlan);
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("admin"), planController_1.deletePlan);
/* MEMBER */
router.post("/buy", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), planController_1.buyPlan);
router.get("/my-plan", authMiddleware_1.protect, (0, authMiddleware_1.authorizeRoles)("member"), planController_1.getMyPlan);
exports.default = router;
