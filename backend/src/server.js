import "./config/env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { dbConnect } from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import facultyRoutes from "./modules/faculty/faculty.routes.js";
import eventRoutes from "./modules/event/event.routes.js";
import galleryRoutes from "./modules/gallery/gallery.routes.js";
import achievementRoutes from "./modules/achievement/achievement.routes.js";
import milestoneRoutes from "./modules/milestone/milestone.routes.js";
import { seedInitialMilestones } from "./modules/milestone/milestone.service.js";
import settingRoutes from "./modules/setting/setting.routes.js";

import dns from "dns/promises";

// Use Google Public DNS
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://joy-schools-6g6n.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, server-to-server or curl requests)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");
      
      const isAllowed = 
        allowedOrigins.includes(normalizedOrigin) ||
        normalizedOrigin.endsWith(".vercel.app") ||
        normalizedOrigin.includes("vercel.app");

      if (isAllowed) {
        return callback(null, true);
      }

      console.warn(`Blocked by CORS policy. Origin: ${origin}`);
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
    credentials: true,
  })
);

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
dbConnect().then(() => {
  seedInitialMilestones();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/settings", settingRoutes);

// Health Check / Ping
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
