import express from "express";
import { purchaseMembership } from "../controllers/membershipController";
import { getMyMembership } from "../controllers/membershipController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/purchase", protect, purchaseMembership);
router.get("/my-membership", protect, getMyMembership);

export default router;