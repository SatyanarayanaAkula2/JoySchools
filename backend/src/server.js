import "./config/env.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "dns/promises";

// Database
import { dbConnect } from "./config/db.js";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import facultyRoutes from "./modules/faculty/faculty.routes.js";
import eventRoutes from "./modules/event/event.routes.js";
import galleryRoutes from "./modules/gallery/gallery.routes.js";
import achievementRoutes from "./modules/achievement/achievement.routes.js";
import milestoneRoutes from "./modules/milestone/milestone.routes.js";
import settingRoutes from "./modules/setting/setting.routes.js";

// Services
import { seedInitialMilestones } from "./modules/milestone/milestone.service.js";


// =====================================================
// GOOGLE PUBLIC DNS
// =====================================================

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);


// =====================================================
// EXPRESS APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 5000;


// =====================================================
// CORS CONFIGURATION
// =====================================================

// Frontend URLs that are explicitly allowed
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    // Your Vercel frontend
    "https://joy-schools-6g6n.vercel.app",

    // Environment variable
    process.env.FRONTEND_URL
]
    .filter(Boolean)
    .map((url) => url.replace(/\/$/, ""));


console.log("======================================");
console.log("Allowed CORS Origins:");
console.log(allowedOrigins);
console.log("======================================");


app.use(
    cors({

        origin: (origin, callback) => {

            // -----------------------------------------
            // Allow requests without Origin
            // -----------------------------------------
            //
            // Examples:
            // - Postman
            // - curl
            // - server-to-server requests
            // -----------------------------------------

            if (!origin) {
                return callback(null, true);
            }


            // Remove trailing slash
            const normalizedOrigin = origin.replace(/\/$/, "");


            console.log("CORS Request From:", normalizedOrigin);


            // -----------------------------------------
            // Exact origin match
            // -----------------------------------------

            if (allowedOrigins.includes(normalizedOrigin)) {

                console.log(
                    "CORS Allowed:",
                    normalizedOrigin
                );

                return callback(null, true);
            }


            // -----------------------------------------
            // Allow Vercel deployments
            // -----------------------------------------
            //
            // Example:
            //
            // https://joy-schools-abc123.vercel.app
            //
            // -----------------------------------------

            if (
                normalizedOrigin.startsWith("https://") &&
                normalizedOrigin.endsWith(".vercel.app")
            ) {

                console.log(
                    "Vercel Origin Allowed:",
                    normalizedOrigin
                );

                return callback(null, true);
            }


            // -----------------------------------------
            // Block unknown origins
            // -----------------------------------------

            console.log(
                "CORS BLOCKED:",
                normalizedOrigin
            );


            return callback(
                new Error(
                    `CORS blocked origin: ${normalizedOrigin}`
                ),
                false
            );
        },


        // -----------------------------------------
        // Cookies / authentication
        // -----------------------------------------

        credentials: true,


        // -----------------------------------------
        // HTTP methods
        // -----------------------------------------

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],


        // -----------------------------------------
        // Request headers
        // -----------------------------------------

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ],


        // -----------------------------------------
        // Response headers
        // -----------------------------------------

        exposedHeaders: [
            "Content-Length"
        ],


        // -----------------------------------------
        // Browser preflight cache
        // -----------------------------------------

        maxAge: 86400

    })
);


// =====================================================
// STANDARD MIDDLEWARE
// =====================================================

app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended: true
    })
);


app.use(
    cookieParser()
);


// =====================================================
// DATABASE CONNECTION
// =====================================================

dbConnect()
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        // Seed initial milestones
        seedInitialMilestones();

    })
    .catch((error) => {

        console.error(
            "Database connection failed:",
            error
        );

    });


// =====================================================
// API ROUTES
// =====================================================

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/students",
    studentRoutes
);


app.use(
    "/api/faculty",
    facultyRoutes
);


app.use(
    "/api/events",
    eventRoutes
);


app.use(
    "/api/gallery",
    galleryRoutes
);


app.use(
    "/api/achievements",
    achievementRoutes
);


app.use(
    "/api/milestones",
    milestoneRoutes
);


app.use(
    "/api/settings",
    settingRoutes
);


// =====================================================
// HEALTH CHECK
// =====================================================

app.get(
    "/api/health",
    (req, res) => {

        res.status(200).json({
            success: true,
            status: "healthy",
            message: "Joy E.M High School API is running",
            timestamp: new Date().toISOString()
        });

    }
);


// =====================================================
// ROOT ROUTE
// =====================================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Joy E.M High School Administration API",
            status: "running"
        });

    }
);


// =====================================================
// 404 HANDLER
// =====================================================

app.use(
    (req, res) => {

        res.status(404).json({
            success: false,
            message: `Route not found: ${req.method} ${req.originalUrl}`
        });

    }
);


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(
    (err, req, res, next) => {

        console.error(
            "======================================"
        );

        console.error(
            "Unhandled Server Error:"
        );

        console.error(err);

        console.error(
            "======================================"
        );


        // CORS error
        if (
            err.message &&
            err.message.toLowerCase().includes("cors")
        ) {

            return res.status(403).json({
                success: false,
                error: err.message
            });

        }


        // General error
        res.status(
            err.status || 500
        ).json({

            success: false,

            error:
                err.message ||
                "Internal server error."

        });

    }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            "======================================"
        );

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            `Health check: http://localhost:${PORT}/api/health`
        );

        console.log(
            "======================================"
        );

    }
);
