"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const startServer = async () => {
    try {
        await (0, db_1.default)();
        // Create HTTP server
        const server = http_1.default.createServer(app_1.default);
        // Initialize Socket.io
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
            }
        });
        // Socket connection
        io.on("connection", (socket) => {
            console.log("⚡ Client connected:", socket.id);
            socket.on("disconnect", () => {
                console.log("❌ Client disconnected:", socket.id);
            });
        });
        // Make io globally accessible
        app_1.default.set("io", io);
        server.listen(PORT, () => {
            console.log("=================================");
            console.log(`🚀 Server running on port ${PORT}`);
            console.log("🏋️ Gym Management API started");
            console.log("⚡ Socket.io real-time server ready");
            console.log("=================================");
        });
    }
    catch (error) {
        console.error("❌ Server failed to start");
        process.exit(1);
    }
};
startServer();
