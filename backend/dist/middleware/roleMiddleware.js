"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberOnly = exports.trainerOnly = exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required"
        });
    }
    next();
};
exports.adminOnly = adminOnly;
const trainerOnly = (req, res, next) => {
    if (req.user.role !== "trainer") {
        return res.status(403).json({
            message: "Trainer access required"
        });
    }
    next();
};
exports.trainerOnly = trainerOnly;
const memberOnly = (req, res, next) => {
    if (req.user.role !== "member") {
        return res.status(403).json({
            message: "Member access required"
        });
    }
    next();
};
exports.memberOnly = memberOnly;
