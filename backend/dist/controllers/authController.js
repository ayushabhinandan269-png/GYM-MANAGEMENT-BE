"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
// REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            membershipPlan: user.membershipPlan,
            trainerAssigned: user.trainerAssigned,
            membershipStatus: user.membershipStatus,
            token: generateToken(user._id.toString(), user.role),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.registerUser = registerUser;
// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email })
            .populate("membershipPlan")
            .populate("trainerAssigned");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            membershipPlan: user.membershipPlan,
            trainerAssigned: user.trainerAssigned,
            membershipStatus: user.membershipStatus,
            token: generateToken(user._id.toString(), user.role),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
