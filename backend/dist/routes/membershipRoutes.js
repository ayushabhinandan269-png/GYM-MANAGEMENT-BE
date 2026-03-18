"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membershipController_1 = require("../controllers/membershipController");
const membershipController_2 = require("../controllers/membershipController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/purchase", authMiddleware_1.protect, membershipController_1.purchaseMembership);
router.get("/my-membership", authMiddleware_1.protect, membershipController_2.getMyMembership);
exports.default = router;
