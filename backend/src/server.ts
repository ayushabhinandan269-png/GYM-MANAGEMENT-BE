import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

import http from "http";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {

  try {

    await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.io
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST","PUT", "DELETE", "PATCH"]
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
    app.set("io", io);

    server.listen(PORT, () => {

      console.log("=================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("🏋️ Gym Management API started");
      console.log("⚡ Socket.io real-time server ready");
      console.log("=================================");

    });

  } catch (error) {

    console.error("❌ Server failed to start");
    process.exit(1);

  }

};

startServer();